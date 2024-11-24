import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { InferSelectModel } from "drizzle-orm";
import { createId } from "../create-id";

export const admins = pgTable("admins", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("admins"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: varchar("title"),
});

export type Admins = InferSelectModel<typeof admins>;
