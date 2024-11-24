import { Repository } from ".";
import { sql } from "drizzle-orm";
import { NotFoundException } from "@/server/exceptions/notFound.exception";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";

export class RolesRepository extends Repository {
  async findByRoleName(role: string) {
    if (!role) {
      throw new NotProvidedException("role name is empty");
    }
    const result = await this.db.execute(sql`
        SELECT permissions from ${this.table} where role = ${role}; 
        `);
    if (result.rowCount === 0) {
      throw new NotFoundException("role does not exist");
    }
    return result.rows[0];
  }
}
