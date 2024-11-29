import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { users } from "./users.table";
import { students } from "./students.table";

export const parents = pgTable("parents", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("parents"))
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

export type Parents = InferSelectModel<typeof parents>;

export const parentsRelations = relations(parents, ({ many }) => ({
  students: many(students),
}));
