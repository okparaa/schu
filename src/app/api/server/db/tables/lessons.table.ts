import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { assignments, attendance, classes, exams, subjects, teachers } from ".";

export const DaysEnum = pgEnum("days", [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

export const lessons = pgTable("lessons", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("lessons"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  name: varchar("name", { length: 60 }).notNull(),
  day: DaysEnum(),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  subjectId: varchar("subject_id").references(() => subjects.id),
  classId: varchar("class_id").references(() => classes.id),
  teacherId: varchar("teacher_id").references(() => teachers.id),
});

export type Lessons = InferSelectModel<typeof lessons>;

export const lessonsRelation = relations(lessons, ({ one, many }) => ({
  class: one(classes, {
    fields: [lessons.classId],
    references: [classes.id],
  }),
  teacher: one(teachers, {
    fields: [lessons.teacherId],
    references: [teachers.id],
  }),
  subject: one(subjects, {
    fields: [lessons.subjectId],
    references: [subjects.id],
  }),
  exams: many(exams),
  attendance: many(attendance),
  assignments: many(assignments),
}));