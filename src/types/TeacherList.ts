import {
  Classes,
  Lessons,
  Subjects,
  Teachers,
  Users,
} from "@/server/db/tables";

export type TeacherList = Teachers & {
  lessons: (Lessons & { subject: Subjects })[];
  user: Users;
  classes: Classes[];
};
