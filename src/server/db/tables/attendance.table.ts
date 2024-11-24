import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { users } from "./users.table";
import { lessons } from "./lessons.table";

export const attendance = pgTable("attendance", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("attendance"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  present: boolean("status").default(false),
  name: varchar("name", { length: 60 }).notNull(),
  date: timestamp("date"),
  studentId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  lessonId: varchar("lesson")
    .notNull()
    .references(() => lessons.id),
});

export type Attendance = InferSelectModel<typeof attendance>;
