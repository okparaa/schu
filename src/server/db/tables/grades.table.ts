import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { classes } from "./classes.table";
import { students } from "./students.table";

export const grades = pgTable("grades", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("grades"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  level: varchar("level", { length: 60 }).notNull(),
});

export type Grades = InferSelectModel<typeof grades>;

export const gradesRelation = relations(grades, ({ many }) => ({
  classes: many(classes),
  students: many(students),
}));
