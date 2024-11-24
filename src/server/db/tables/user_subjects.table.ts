import { pgTable, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { users } from "./users.table";
import { subjects } from "./subjects.table";

export const userSubjects = pgTable("user_subjects", {
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  subjectId: varchar("subject_id")
    .notNull()
    .references(() => subjects.id),
});

export type UserSubjects = InferSelectModel<typeof userSubjects>;
