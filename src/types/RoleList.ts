import { Perms, Roles, RolesPerms } from "@/app/api/server/db/tables";

export type RoleList = Roles & {
  rolesPerms: (RolesPerms & { perm: Perms })[];
};
