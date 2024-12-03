import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { announcements, events, grades, lessons, students, teachers } from ".";

export const classes = pgTable("classes", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("classes"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  name: varchar("name", { length: 60 }).notNull(),
  capacity: decimal("capacity"),
  gradeId: varchar("grade_id").references(() => grades.id),
  teacherId: varchar("teacher_id").references(() => teachers.id),
});

export type Classes = InferSelectModel<typeof classes>;

export const classesRelation = relations(classes, ({ many, one }) => ({
  announcements: many(announcements),
  events: many(events),
  lessons: many(lessons),
  students: many(students),
  grade: one(grades, { fields: [classes.gradeId], references: [grades.id] }),
  teacher: one(teachers, {
    fields: [classes.teacherId],
    references: [teachers.id],
  }),
}));
