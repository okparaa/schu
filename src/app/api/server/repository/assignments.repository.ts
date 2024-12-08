import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import {
  assignments,
  classes,
  lessons,
  students,
  teachers,
} from "../db/tables";
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
                    .innerJoin(teachers, eq(teachers.id, lessons.teacherId))
                    .where(eq(teachers.id, params.tid as string))
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
                    .innerJoin(classes, eq(classes.id, lessons.classId))
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
        const records = await tx.query.assignments.findMany({
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
          .select({ count: count() })
          .from(assignments)
          .where(or(...query));
        return { records, total } as unknown as {
          records: AssignmentList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
