import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { ExamList } from "@/types/ExamList";
import { classes, exams, lessons, students } from "../db/tables";

export class ExamsRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getExams(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("limit is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "tid":
              query.push(
                inArray(
                  exams.lessonId,
                  this.db
                    .select({ id: lessons.id })
                    .from(lessons)
                    .innerJoin(exams, eq(exams.lessonId, lessons.id))
                    .where(eq(lessons.id, params.tid as string))
                )
              );
              break;
            case "std":
              query.push(
                inArray(
                  exams.lessonId,
                  this.db
                    .select({ id: lessons.id })
                    .from(lessons)
                    .leftJoin(classes, eq(classes.id, lessons.classId))
                    .leftJoin(students, eq(students.classId, classes.id))
                    .where(eq(students.id, params.std as string))
                )
              );
              break;
            case "sach":
              query.push(
                inArray(
                  exams.lessonId,
                  this.db
                    .select({ id: lessons.id })
                    .from(lessons)
                    .innerJoin(exams, eq(lessons.id, exams.lessonId))
                    .where(ilike(exams.title, "%" + params.sach + "%"))
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
        const results = await tx.query.exams.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            lesson: {
              with: {
                class: true,
                teacher: {
                  with: {
                    user: true,
                  },
                },
                subject: true,
              },
            },
          },
        });

        const [total] = await tx
          .select({ total: count() })
          .from(exams)
          .where(or(...query));
        return [results, total] as unknown as [ExamList[], { total: number }];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
