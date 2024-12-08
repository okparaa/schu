import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { assignments, exams, students } from ".";

export const results = pgTable("results", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("results"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  score: varchar("score"),
  examId: varchar("exam_id").references(() => exams.id),
  assignmentId: varchar("assignment_id").references(() => assignments.id),
  studentId: varchar("student_id")
    .notNull()
    .references(() => students.id),
});

export type Results = InferSelectModel<typeof results>;

export const resultsRelations = relations(results, ({ one }) => ({
  exam: one(exams, {
    fields: [results.examId],
    references: [exams.id],
  }),
  assignment: one(assignments, {
    fields: [results.assignmentId],
    references: [assignments.id],
  }),
  student: one(students, {
    fields: [results.studentId],
    references: [students.id],
  }),
}));
