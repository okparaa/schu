import { pgTable, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { users } from "./users.table";
import { lessons } from "./lessons.table";

export const userLessons = pgTable("user_lessons", {
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  lessonId: varchar("lesson_id")
    .notNull()
    .references(() => lessons.id),
});

export type UserLessons = InferSelectModel<typeof userLessons>;
