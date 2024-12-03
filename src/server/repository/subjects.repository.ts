import { and, count, ilike, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";
import { subjects } from "../db/tables";
import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
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
        const results = await tx.query.subjects.findMany({
          limit,
          offset,
          where: and(...query),
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
          .select({ total: count() })
          .from(subjects)
          .where(and(...query));
        return [results, total] as unknown as [
          SubjectList[],
          { total: number }
        ];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
