import { and, count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";
import { classes, lessons, students, users } from "../db/tables";
import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { StudentList } from "@/types/StudentList";
import { RequestQueryType } from "../schemas/query.schema";

export class StudentsRepository extends Repository {
  async getStudent(id: string) {
    if (!id) {
      throw new NotProvidedException("id is required");
    }
    try {
      return await this.db.query.students.findFirst({
        where: eq(students.id, id),
        with: {
          user: true,
        },
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
  async getStudents(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "tid":
              query.push(
                inArray(
                  students.classId,
                  this.db
                    .select({ id: lessons.classId })
                    .from(lessons)
                    .innerJoin(classes, eq(classes.id, lessons.classId))
                    .where(eq(classes.teacherId, params.tid as string))
                )
              );
              break;
            case "sach":
              query.push(
                inArray(
                  students.userId,
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
        const results = await tx.query.students.findMany({
          limit,
          offset,
          where: and(...query),
          with: {
            grade: true,
            class: true,
            user: true,
          },
        });

        const [total] = await tx
          .select({ total: count() })
          .from(students)
          .where(and(...query));
        return [results, total] as unknown as [
          StudentList[],
          { total: number }
        ];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
