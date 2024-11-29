import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createId } from "../create-id";
import { students } from "./students.table";

export const pins = pgTable("pins", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("pins"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status"),
  pin: varchar("pin"),
  session: varchar("session"),
  term: varchar("term"),
  studentId: varchar("student_id").references(() => students.id),
});

export type PinsSelect = InferSelectModel<typeof pins>;

export const pinsRelation = relations(pins, ({ one }) => ({
  student: one(students, {
    fields: [pins.studentId],
    references: [students.id],
  }),
}));
