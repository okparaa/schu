import { count, ilike, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";
import { subjects } from "../db/tables";
import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { SubjectList } from "@/types/SubjectList";
import { RequestQueryType } from "../schemas/query.schema";

export class SubjectsRepository extends Repository {
  async getSubjects(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "sach":
              query.push(ilike(subjects.name, "%" + params.sach + "%"));
              break;

            default:
              break;
          }
        }
      }
    }
    try {
      return await this.db.transaction(async (tx) => {
        const records = await tx.query.subjects.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            lessons: {
              with: {
                teacher: {
                  with: { user: true },
                },
              },
            },
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(subjects)
          .where(or(...query));
        return { records, total } as unknown as {
          records: SubjectList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
