import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { exams } from "./exams.table";
import { assignments } from "./assignments.table";
import { users } from "./users.table";

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
  score: varchar("score", { length: 60 }).notNull(),
  examId: varchar("exam_id").references(() => exams.id),
  assignmentId: varchar("assignment_id").references(() => assignments.id),
  studentId: varchar("user_id")
    .notNull()
    .references(() => users.id),
});

export type Results = InferSelectModel<typeof results>;
