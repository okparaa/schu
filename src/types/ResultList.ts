import {
  Assignments,
  Classes,
  Exams,
  Lessons,
  Results,
  Students,
  Subjects,
  Teachers,
  Users,
} from "@/app/api/server/db/tables";

export type ResultList = Results & {
  student: Students & { user: Users };
  assignment: Assignments & {
    lesson: Lessons & {
      class: Classes;
      subject: Subjects;
      teacher: Teachers & { user: Users };
    };
  };
  exam: Exams & {
    lesson: Lessons & {
      class: Classes;
      subject: Subjects;
      teacher: Teachers & { user: Users };
    };
  };
};

export type ResultProps = {
  id: string;
  title: string;
  studentSurname: string;
  studentFirstname: string;
  teacherSurname: string;
  teacherFirstname: string;
  score: string;
  className: string;
  startTime: Date;
};
