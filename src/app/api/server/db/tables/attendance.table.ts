import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { lessons } from "./lessons.table";
import { students } from "./students.table";

export const attendance = pgTable("attendance", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("attendance"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  present: boolean("status").default(false),
  date: timestamp("date"),
  studentId: varchar("student_id")
    .notNull()
    .references(() => students.id),
  lessonId: varchar("lesson_id")
    .notNull()
    .references(() => lessons.id),
});

export type Attendance = InferSelectModel<typeof attendance>;

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(students, {
    fields: [attendance.studentId],
    references: [students.id],
  }),
  lesson: one(lessons, {
    fields: [attendance.lessonId],
    references: [lessons.id],
  }),
}));
