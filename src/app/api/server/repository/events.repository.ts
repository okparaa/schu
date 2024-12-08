import { count, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { Repository } from ".";
import { NotProvidedException } from "@/app/api/server/exceptions/notProvided.exception";

import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { EventList } from "@/types/EventList";
import { classes, events, students, teachers } from "../db/tables";

export class EventsRepository extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getEvents(limit: number, offset: number, params: RequestQueryType) {
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
                  events.classId,
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
                  events.classId,
                  this.db
                    .select({ id: classes.id })
                    .from(classes)
                    .innerJoin(students, eq(students.classId, classes.id))
                    .where(eq(students.id, params.std as string))
                )
              );
              break;
            case "sach":
              query.push(ilike(events.title, "%" + params.sach + "%"));
              query.push(
                inArray(
                  events.classId,
                  this.db
                    .select({ id: classes.id })
                    .from(classes)
                    .where(ilike(classes.name, "%" + params.sach + "%"))
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
        const records = await tx.query.events.findMany({
          limit,
          offset,
          where: or(...query),
          with: {
            class: {
              with: {
                students: {
                  with: {
                    user: true,
                  },
                },
                teacher: {
                  with: {
                    user: true,
                  },
                },
              },
            },
          },
        });

        const [total] = await tx
          .select({ count: count() })
          .from(events)
          .where(or(...query));
        return { records, total } as unknown as {
          records: EventList[];
          total: { count: number };
        };
      });
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
