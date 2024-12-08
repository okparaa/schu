import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { lessons } from ".";

export const subjects = pgTable("subjects", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("subjects"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  name: varchar("name").notNull().unique(),
  description: varchar("description"),
});

export type Subjects = InferSelectModel<typeof subjects>;

export const subjectsRelation = relations(subjects, ({ many }) => ({
  lessons: many(lessons),
}));
