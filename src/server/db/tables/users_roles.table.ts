import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { roles, users } from ".";

export const usersRoles = pgTable(
  "users_roles",
  {
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    roleId: varchar("role_id")
      .notNull()
      .references(() => roles.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roleId] }),
  })
);

export type UsersRoles = InferSelectModel<typeof usersRoles>;

export const usersRolesRelation = relations(usersRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersRoles.roleId],
    references: [roles.id],
  }),
}));
