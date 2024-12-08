import {
  Classes,
  Exams,
  Lessons,
  Subjects,
  Teachers,
  Users,
} from "@/app/api/server/db/tables";

export type ExamList = Exams & {
  lesson: Lessons & {
    teacher: Teachers & { user: Users };
    subject: Subjects;
    class: Classes;
  };
};
