import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";
import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { LessonList } from "@/types/LessonList";
import { RequestQueryType } from "../schemas/query.schema";
import {
  classes,
  lessons,
  students,
  subjects,
  teachers,
  users,
} from "../db/tables";

export class LessonsRepository extends Repository {
  async getClasses(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("limit is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "sach":
              query.push(
                inArray(
                  lessons.teacherId,
                  this.db
                    .select({ id: teachers.id })
                    .from(lessons)
                    .innerJoin(teachers, eq(teachers.id, lessons.teacherId))
                    .innerJoin(users, eq(users.id, teachers.userId))
                    .where(
                      or(
                        ilike(users.surname, "%" + params.sach + "%"),
                        ilike(users.lastname, "%" + params.sach + "%")
                      )
                    )
                )
              );
              query.push(
                inArray(
                  lessons.subjectId,
                  this.db
                    .select({ id: subjects.id })
                    .from(lessons)
                    .innerJoin(subjects, eq(subjects.id, lessons.subjectId))
                    .where(ilike(subjects.name, "%" + params.sach + "%"))
                )
              );
              query.push(
                inArray(
                  lessons.classId,
                  this.db
                    .select({ id: classes.id })
                    .from(lessons)
                    .innerJoin(classes, eq(classes.id, lessons.classId))
                    .where(ilike(classes.name, "%" + params.sach + "%"))
                )
              );
              break;
            case "tid":
              query.push(eq(lessons.teacherId, params.tid as string));
              break;
            case "std":
              query.push(
                inArray(
                  lessons.classId,
                  this.db
                    .select({ id: classes.id })
                    .from(classes)
                    .innerJoin(students, eq(students.classId, classes.id))
                    .where(eq(students.id, params.std as string))
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
        const results = await tx.query.lessons.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            class: true,
            subject: true,
            teacher: {
              with: {
                user: true,
              },
            },
          },
        });

        const [total] = await tx
          .select({ total: count() })
          .from(lessons)
          .where(or(...query));
        return [results, total] as unknown as [LessonList[], { total: number }];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
