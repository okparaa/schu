import { count, inArray, eq, SQL, ilike, or } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";
import { classes, students, teachers, users } from "../db/tables";
import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { TeacherList } from "@/types/TeacherList";
import { RequestQueryType } from "../schemas/query.schema";

export class TeachersRepository extends Repository {
  async getTeacher(id: string) {
    if (!id) {
      throw new NotProvidedException("id is required");
    }
    try {
      return await this.db.query.teachers.findFirst({
        where: eq(teachers.id, id),
        with: {
          user: true,
        },
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
  async getTeachers(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "cid":
              query.push(
                inArray(
                  teachers.id,
                  this.db
                    .select({ id: classes.teacherId })
                    .from(classes)
                    .where(eq(classes.id, params.cid as string))
                )
              );
              break;
            case "std":
              query.push(
                inArray(
                  teachers.id,
                  this.db
                    .select({ id: classes.teacherId })
                    .from(classes)
                    .leftJoin(students, eq(students.classId, classes.id))
                    .where(eq(students.id, params.std as string))
                )
              );
              break;
            case "sach":
              query.push(
                inArray(
                  teachers.userId,
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
        const records = await tx.query.teachers.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            lessons: {
              with: {
                subject: true,
              },
            },
            user: true,
            classes: true,
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(teachers)
          .where(or(...query));
        return { records, total } as unknown as {
          teachers: TeacherList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
