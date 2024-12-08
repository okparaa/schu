import { count, eq, ilike, inArray, or, sql, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";
import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { ClassList } from "@/types/ClassList";
import { RequestQueryType } from "../schemas/query.schema";
import { classes, teachers, users } from "../db/tables";

export class ClassesRepository extends Repository {
  async getClasses(limit: number, offset: number, params: RequestQueryType) {
    if (!limit) {
      throw new NotProvidedException("Username is required");
    }
    const query: SQL[] = [];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          switch (key) {
            case "sach":
              query.push(ilike(classes.name, "%" + params.sach + "%"));
              query.push(
                inArray(
                  classes.teacherId,
                  this.db
                    .select({ id: teachers.id })
                    .from(teachers)
                    .innerJoin(users, eq(users.id, teachers.userId))
                    .where(
                      ilike(
                        sql`${users.surname} || ' ' || ${users.lastname}`,
                        "%" + params.sach + "%"
                      )
                    )
                )
              );
              break;
            case "tid":
              query.push(eq(classes.teacherId, params.tid as string));
              break;

            default:
              break;
          }
        }
      }
    }
    try {
      return await this.db.transaction(async (tx) => {
        const records = await tx.query.classes.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            grade: true,
            teacher: {
              with: {
                user: true,
              },
            },
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(classes)
          .where(or(...query));
        return { records, total } as unknown as {
          records: ClassList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
