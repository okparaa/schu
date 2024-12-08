import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";
import { roles } from "../db/tables";
import { count, ilike, or, SQL } from "drizzle-orm";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { RoleList } from "@/types/RoleList";

export class RolesRepository extends Repository {
  async getRoles(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("limit is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "sach":
              query.push(ilike(roles.role, "%" + params.sach + "%"));
              break;
            default:
              break;
          }
        }
      }
    }
    try {
      return await this.db.transaction(async (tx) => {
        const records = await tx.query.roles.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            rolesPerms: {
              with: {
                perm: true,
              },
            },
          },
        });

        const [total] = await tx.select({ count: count() }).from(roles);
        // .where(or(...query));
        return { records, total } as unknown as {
          records: RoleList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
