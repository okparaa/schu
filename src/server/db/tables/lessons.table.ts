import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { subjects } from "./subjects.table";
import { classes } from "./classes.table";
import { users } from "./users.table";

export const DaysEnum = pgEnum("days", [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

export const lessons = pgTable("lessons", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("lessons"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  name: varchar("name", { length: 60 }).notNull(),
  day: DaysEnum(),
  startTime: date("start_time"),
  endTime: date("end_time"),
  subjectId: varchar("subject_id").references(() => subjects.id),
  classId: varchar("class_id").references(() => classes.id),
  teacherId: varchar("user_id").references(() => users.id),
});

export type Lessons = InferSelectModel<typeof lessons>;
