import { sql } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";
import { NotFoundException } from "@/app/api/server/exceptions/notFound.exception";
import { Users } from "../db/tables";
import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";

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
}
