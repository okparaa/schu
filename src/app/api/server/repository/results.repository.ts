import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { assignments, results } from "../db/tables";
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
                  results.assignmentId,
                  this.db
                    .select({ id: assignments.id })
                    .from(assignments)
                    .innerJoin(
                      results,
                      eq(assignments.id, results.assignmentId)
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
        const records = await tx.query.results.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            student: {
              with: {
                user: true,
              },
            },
            assignment: {
              with: {
                lesson: {
                  with: {
                    subject: true,
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
                    subject: true,
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
          .select({ count: count() })
          .from(results)
          .where(or(...query));
        return { records, total } as unknown as {
          records: ResultList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
