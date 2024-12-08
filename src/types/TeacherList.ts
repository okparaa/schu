import {
  Classes,
  Lessons,
  Roles,
  Subjects,
  Teachers,
  Users,
  UsersRoles,
} from "@/app/api/server/db/tables";

export type TeacherList = Teachers & {
  lessons: (Lessons & { subject: Subjects })[];
  user: Users & { userRoles: (UsersRoles & { role: Roles })[] };
  classes: Classes[];
};
