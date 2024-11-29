import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import {
  attendance,
  classes,
  grades,
  parents,
  pins,
  results,
  teachers,
  users,
} from ".";

export const students = pgTable("students", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("students"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  userId: varchar("user_id")
    .references(() => users.id)
    .unique(),
  parentId: varchar("parent_id").references(() => parents.id),
  classId: varchar("class_id").references(() => classes.id),
  gradeId: varchar("grade_id").references(() => grades.id),
});

export type Students = InferSelectModel<typeof students>;

export const studentsRelation = relations(students, ({ one, many }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  teacher: one(teachers, {
    fields: [students.parentId],
    references: [teachers.id],
  }),
  parent: one(parents, {
    fields: [students.parentId],
    references: [parents.id],
  }),
  pins: one(pins),
  classe: one(classes),
  attendance: many(attendance),
  results: many(results),
}));
