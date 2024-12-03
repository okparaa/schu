import {
  Assignments,
  Classes,
  Lessons,
  Subjects,
  Teachers,
  Users,
} from "@/server/db/tables";

export type AssignmentList = Assignments & {
  lesson: Lessons & {
    teacher: Teachers & { user: Users };
    subject: Subjects;
    class: Classes;
  };
};
