import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { rolesPerms, usersRoles } from ".";

export const roles = pgTable("roles", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("roles"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
  role: varchar("role").notNull().unique(),
  description: varchar("description").notNull(),
});

export type Roles = InferSelectModel<typeof roles>;
export const rolesRelation = relations(roles, ({ many }) => ({
  usersRoles: many(usersRoles),
  rolesPerms: many(rolesPerms),
}));