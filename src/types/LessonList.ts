import {
  Classes,
  Lessons,
  Subjects,
  Teachers,
  Users,
} from "@/app/api/server/db/tables";

export type LessonList = Lessons & {
  teacher: Teachers & { user: Users };
  class: Classes;
  subject: Subjects;
};
