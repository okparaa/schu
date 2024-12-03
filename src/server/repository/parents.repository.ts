import { and, count, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";
import { parents, users } from "../db/tables";
import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { ParentList } from "@/types/ParentList";
import { RequestQueryType } from "../schemas/query.schema";

export class ParentsRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const results = await tx.query.parents.findMany({
          limit,
          offset,
          where: and(...query),
          with: {
            students: true,
            user: true,
          },
        });

        const [total] = await tx
          .select({ total: count() })
          .from(parents)
          .where(and(...query));
        return [results, total] as unknown as [ParentList[], { total: number }];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
