import { count, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";
import { parents, users } from "../db/tables";
import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { ParentList } from "@/types/ParentList";
import { RequestQueryType } from "../schemas/query.schema";

export class ParentsRepository extends Repository {
  async getParents(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "sach":
              query.push(
                inArray(
                  parents.userId,
                  this.db
                    .select({ id: users.id })
                    .from(users)
                    .where(
                      or(
                        ilike(users.surname, "%" + params.sach + "%"),
                        ilike(users.firstname, "%" + params.sach + "%")
                      )
                    )
                )
              );
              break;

            default:
              break;
          }
        }
      }
    }
    try {
      return await this.db.transaction(async (tx) => {
        const records = await tx.query.parents.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            students: true,
            user: true,
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(parents)
          .where(or(...query));
        return { records, total } as unknown as {
          records: ParentList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
