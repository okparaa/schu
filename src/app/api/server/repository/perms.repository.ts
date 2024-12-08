import { PermList } from "@/types/PermList";
import { count, ilike, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { perms } from "../db/tables";
import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";

export class PermsRepository extends Repository {
  async getPerms(limit: number, offset: number, params: RequestQueryType) {
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "sach":
              query.push(ilike(perms.name, "%" + params.sach + "%"));
              break;

            default:
              break;
          }
        }
      }
    }
    try {
      return await this.db.transaction(async (tx) => {
        const records = await tx.query.perms.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            rolesPerms: {
              with: {
                role: true,
              },
            },
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(perms)
          .where(or(...query));
        return { records, total } as unknown as {
          records: PermList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
