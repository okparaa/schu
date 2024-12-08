import {
  Classes,
  Grades,
  Roles,
  Students,
  Users,
  UsersRoles,
} from "@/app/api/server/db/tables";

export type StudentList = Students & {
  grade: Grades;
  user: Users & { userRoles: (UsersRoles & { role: Roles })[] };
  class: Classes;
};
