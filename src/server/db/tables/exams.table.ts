import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { lessons, results } from ".";

export const exams = pgTable("exams", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("exams"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  title: varchar("title", { length: 60 }).notNull(),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  lessonId: varchar("lesson_id").references(() => lessons.id),
});

export type Exams = InferSelectModel<typeof exams>;

export const examsRelations = relations(exams, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [exams.lessonId],
    references: [lessons.id],
  }),
  results: many(results),
}));
