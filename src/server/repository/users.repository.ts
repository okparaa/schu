import { count, sql } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";
import { NotFoundException } from "@/server/exceptions/notFound.exception";
import { Users } from "../db/tables";
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
  async getTeachers(limit: number, offset: number) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    try {
      return await this.db.transaction(async (tx) => {
        const result = await tx.execute(
          sql`SELECT u.*,
            ARRAY_AGG(s.name) subjects,
            ARRAY_AGG(c.name) classes
            FROM users u 
            LEFT JOIN user_subjects us ON us.user_id = u.id
            LEFT JOIN subjects s ON s.id = us.subject_id          
            LEFT JOIN classes c ON c.user_id = u.id          
            GROUP BY u.id LIMIT ${limit} OFFSET ${offset}`
        );
        const total = await tx.select({ count: count() }).from(this.table);
        return [result.rows, total];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
