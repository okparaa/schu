import { Perms, Roles, RolesPerms } from "@/app/api/server/db/tables";

export type PermList = Perms & {
  rolePerms: (RolesPerms & { roles: Roles })[];
};
