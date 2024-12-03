import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { assignments, lessons, results } from "../db/tables";
import { ResultList } from "@/types/ResultList";

export class ResultsRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getResults(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("limit is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "tid":
              // query.push(
              //   inArray(
              //     results.id,
              //     this.db
              //       .select({ id: exams. })
              //       .from(exams)
              //       .innerJoin(lessons, eq(exams.lessonId, lessons.id))
              //       .where(eq(lessons.re, params.tid as string))
              //   )
              // );
              break;
            case "std":
              // query.push(
              //   inArray(
              //     results.lessonId,
              //     this.db
              //       .select({ id: lessons.id })
              //       .from(lessons)
              //       .leftJoin(classes, eq(classes.id, lessons.classId))
              //       .leftJoin(students, eq(students.classId, classes.id))
              //       .where(eq(students.id, params.std as string))
              //   )
              // );
              break;
            case "sach":
              query.push(
                inArray(
                  assignments.lessonId,
                  this.db
                    .select({ id: lessons.id })
                    .from(lessons)
                    .innerJoin(
                      assignments,
                      eq(lessons.id, assignments.lessonId)
                    )
                    .where(ilike(assignments.title, "%" + params.sach + "%"))
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
        const data = await tx.query.results.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            student: true,
            assignment: {
              with: {
                lesson: {
                  with: {
                    class: true,
                    teacher: {
                      with: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },
            exam: {
              with: {
                lesson: {
                  with: {
                    class: true,
                    teacher: {
                      with: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        const [total] = await tx
          .select({ total: count() })
          .from(results)
          .where(or(...query));
        return [data, total] as unknown as [ResultList[], { total: number }];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
