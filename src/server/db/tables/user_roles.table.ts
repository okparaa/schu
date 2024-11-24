import { pgTable, varchar } from "drizzle-orm/pg-core";
import { roles } from "./roles.table";
import { InferSelectModel } from "drizzle-orm";
import { users } from "./users.table";

export const userRoles = pgTable("user_roles", {
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  roleId: varchar("role_id")
    .notNull()
    .references(() => roles.id),
});

export type UserRoles = InferSelectModel<typeof userRoles>;
