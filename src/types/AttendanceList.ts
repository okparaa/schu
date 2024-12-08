import {
  Attendance,
  Classes,
  Lessons,
  Students,
  Subjects,
  Teachers,
  Users,
} from "@/app/api/server/db/tables";

export type AttendanceList = Attendance & {
  student: Students;
  lesson: Lessons & {
    class: Classes;
    subject: Subjects;
    teacher: Teachers & { user: Users };
  };
};
