import {
  Parents,
  Roles,
  Students,
  Users,
  UsersRoles,
} from "@/app/api/server/db/tables";

export type ParentList = Parents & {
  user: Users & { userRoles: (UsersRoles & { role: Roles })[] };
  students: Students[];
};
