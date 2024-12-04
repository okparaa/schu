import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { classes } from "./classes.table";

export const bulletins = pgTable("bulletins", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("bulletins"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  title: varchar("title").notNull(),
  description: varchar("description"),
  classId: varchar("class_id").references(() => classes.id),
  date: timestamp("date"),
});

export type Bulletins = InferSelectModel<typeof bulletins>;

export const bulletinsRelations = relations(bulletins, ({ one }) => ({
  class: one(classes, {
    fields: [bulletins.classId],
    references: [classes.id],
  }),
}));
