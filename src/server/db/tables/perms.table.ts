import { InferInsertModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { rolesPerms } from "./role_perms.table";

export const perms = pgTable("perms", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("perms"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: varchar("name").notNull().unique(),
  slug: varchar("slug").notNull().unique(),
  description: varchar("description"),
});

export type Perms = InferInsertModel<typeof perms>;

export const permsRelations = relations(perms, ({ many }) => ({
  rolesPerms: many(rolesPerms),
}));
