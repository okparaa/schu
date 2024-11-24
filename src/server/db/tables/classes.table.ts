import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { users } from "./users.table";
import { grades } from "./grades.table";

export const classes = pgTable("classes", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("classes"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  name: varchar("name", { length: 60 }).notNull(),
  capacity: decimal("capacity"),
  teacherId: varchar("user_id").references(() => users.id),
  gradeId: varchar("grade_id").references(() => grades.id),
});

export type Classes = InferSelectModel<typeof classes>;
