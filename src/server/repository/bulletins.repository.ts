import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { ExamList } from "@/types/ExamList";
import { classes, bulletins, lessons, students, teachers } from "../db/tables";

export class BulletinsRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBulletins(limit: number, offset: number, params: RequestQueryType) {
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
                  bulletins.classId,
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
                  bulletins.classId,
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
                  bulletins.classId,
                  this.db
                    .select({ id: classes.id })
                    .from(classes)
                    .innerJoin(bulletins, eq(bulletins.classId, classes.id))
                    .where(ilike(bulletins.title, "%" + params.sach + "%"))
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
        const results = await tx.query.bulletins.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            class: true,
          },
        });

        const [total] = await tx
          .select({ total: count() })
          .from(bulletins)
          .where(or(...query));
        return [results, total] as unknown as [ExamList[], { total: number }];
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
