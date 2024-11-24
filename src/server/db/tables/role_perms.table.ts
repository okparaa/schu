import { pgTable, varchar } from "drizzle-orm/pg-core";
import { roles } from "./roles.table";
import { InferSelectModel } from "drizzle-orm";
import { perms } from "./perms.table";

export const rolePerms = pgTable("role_perms", {
  permId: varchar("perm_id")
    .notNull()
    .references(() => perms.id),
  roleId: varchar("role_id")
    .notNull()
    .references(() => roles.id),
});

export type RolePerms = InferSelectModel<typeof rolePerms>;
