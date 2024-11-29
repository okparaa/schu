import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { roles } from "./roles.table";
import { InferSelectModel, relations } from "drizzle-orm";
import { perms } from "./perms.table";

export const rolesPerms = pgTable(
  "roles_perms",
  {
    permId: varchar("perm_id")
      .notNull()
      .references(() => perms.id),
    roleId: varchar("role_id")
      .notNull()
      .references(() => roles.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.permId, t.roleId] }),
  })
);

export type RolesPerms = InferSelectModel<typeof rolesPerms>;

export const rolesPermsRelation = relations(rolesPerms, ({ one }) => ({
  role: one(roles, {
    fields: [rolesPerms.roleId],
    references: [roles.id],
  }),
  perm: one(perms, {
    fields: [rolesPerms.permId],
    references: [perms.id],
  }),
}));
