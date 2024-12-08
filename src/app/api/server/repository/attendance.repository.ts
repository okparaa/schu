import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { classes, attendance, lessons, students, teachers } from "../db/tables";
import { AttendanceList } from "@/types/AttendanceList";

export class AttendanceRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAttendance(limit: number, offset: number, params: RequestQueryType) {
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
                  attendance.lessonId,
                  this.db
                    .select({ id: classes.id })
                    .from(classes)
                    .innerJoin(teachers, eq(teachers.id, classes.teacherId))
                    .where(eq(teachers.id, params.tid as string))
                )
              );
              break;
            case "std":
              query.push(
                inArray(
                  attendance.lessonId,
                  this.db
                    .select({ id: classes.id })
                    .from(classes)
                    .innerJoin(classes, eq(classes.id, lessons.classId))
                    .leftJoin(students, eq(students.classId, classes.id))
                    .where(eq(students.id, params.std as string))
                )
              );
              break;
            case "sach":
              query.push(
                inArray(
                  attendance.lessonId,
                  this.db
                    .select({ id: lessons.id })
                    .from(lessons)
                    .innerJoin(attendance, eq(attendance.lessonId, lessons.id))
                    .where(ilike(lessons.name, "%" + params.sach + "%"))
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
        const records = await tx.query.attendance.findMany({
          limit,
          offset,
          where: or(...query),
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
            student: true,
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(attendance)
          .where(or(...query));
        return { records, total } as unknown as {
          records: AttendanceList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
