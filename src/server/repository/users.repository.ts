import { count, eq, sql } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";
import { NotFoundException } from "@/server/exceptions/notFound.exception";
import { userRoles, users, Users } from "../db/tables";
import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";

export class UsersRepository extends Repository {
  async getUserByUsername(username: string) {
    if (!username) {
      throw new NotProvidedException("Username is required");
    }

    try {
      const result = await this.db.execute(
        sql`SELECT u.*, ur.role FROM ${this.table} u 
          LEFT JOIN user_roles ur ON u.id = ur.user_id 
          WHERE username = ${username}`
      );

      if (result.rowCount === 0) {
        throw new NotFoundException("User not found");
      }

      const user = result.rows[0] as Users & { role: string };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }

  async getUsers(limit: number, offset: number, type: string, cid: string) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    // sql`SELECT u.*,
    //         ARRAY_AGG(s.name) subjects,
    //         ARRAY_AGG(c.name) classes
    //         FROM users u
    //         LEFT JOIN user_roles ur on ur.user_id = u.id
    //         LEFT JOIN user_subjects us ON us.user_id = u.id
    //         LEFT JOIN subjects s ON s.id = us.subject_id
    //         LEFT JOIN classes c ON c.user_id = u.id
    //         LEFT JOIN grades g ON g.id = u.grade_id
    //         WHERE ur.user_type = ${type}
    //         GROUP BY u.id LIMIT ${limit} OFFSET ${offset}`;
    try {
      return await this.db.transaction(async (tx) => {
        const teachers = await tx.query.users.findMany({
          limit,
          offset,
          with: {
            subjects: true,
            classes: true,
            roles: {
              where: (userRoles, { eq }) => eq(userRoles.userType, "teacher"),
            },
          },
        });

        console.log(cid);

        const total = await tx
          .select({ total: count(users.id) })
          .from(users)
          .leftJoin(userRoles, eq(userRoles.userId, users.id))
          .where(eq(userRoles.userType, type));
        return { teachers, total };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
