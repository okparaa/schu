import {
  Assignments,
  Classes,
  Exams,
  Lessons,
  Results,
  Students,
  Teachers,
  Users,
} from "@/server/db/tables";

export type ResultList = Results & {
  student: Students & { user: Users };
  assignment: Assignments & {
    lesson: Lessons & {
      class: Classes;
      teacher: Teachers & { user: Users };
    };
  };
  exam: Exams & {
    lesson: Lessons & {
      class: Classes;
      teacher: Teachers & { user: Users };
    };
  };
};
