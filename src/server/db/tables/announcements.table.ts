import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { classes } from "./classes.table";

export const announcements = pgTable("announcements", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("announcements"))
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

export type Announcements = InferSelectModel<typeof announcements>;

export const announcementsRelations = relations(announcements, ({ one }) => ({
  classe: one(classes, {
    fields: [announcements.classId],
    references: [classes.id],
  }),
}));
