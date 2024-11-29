import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { lessons, results } from ".";

export const assignments = pgTable("assignments", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("assignments"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  title: varchar("title", { length: 60 }).notNull(),
  startDate: timestamp("start_date"),
  dueDate: timestamp("end_date"),
  lessonId: varchar("lesson_id").references(() => lessons.id),
});

export type Assignments = InferSelectModel<typeof assignments>;

export const assignmentsRelation = relations(assignments, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [assignments.lessonId],
    references: [lessons.id],
  }),
  results: many(results),
}));
