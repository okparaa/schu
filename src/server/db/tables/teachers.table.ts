import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { users } from "./users.table";
import { lessons } from "./lessons.table";

export const teachers = pgTable("teachers", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("teachers"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  userId: varchar("user_id").references(() => users.id),
});

export type Teachers = InferSelectModel<typeof teachers>;

export const teachersRelations = relations(teachers, ({ many }) => ({
  lessons: many(lessons),
}));
