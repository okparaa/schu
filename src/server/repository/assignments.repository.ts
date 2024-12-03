import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { assignments, classes, lessons, students } from "../db/tables";
import { AssignmentList } from "@/types/AssignmentList";

export class AssignmentsRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAssignments(
    limit: number,
    offset: number,
    params: RequestQueryType
  ) {
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
                  assignments.lessonId,
                  this.db
                    .select({ id: lessons.id })
                    .from(lessons)
                    .innerJoin(
                      assignments,
                      eq(assignments.lessonId, lessons.id)
                    )
                    .where(eq(lessons.id, params.tid as string))
                )
              );
              break;
            case "std":
              query.push(
                inArray(
                  assignments.lessonId,
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
        const results = await tx.query.assignments.findMany({
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
          .from(assignments)
          .where(or(...query));
        return [results, total] as unknown as [
          AssignmentList[],
          { total: number }
        ];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
