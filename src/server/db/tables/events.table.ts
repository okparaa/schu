import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { classes } from "./classes.table";

export const events = pgTable("events", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("events"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  title: varchar("title"),
  description: varchar("description"),
  classId: varchar("classId").references(() => classes.id),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
});

export type Events = InferSelectModel<typeof events>;
