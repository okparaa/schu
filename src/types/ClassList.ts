import { Classes, Grades, Teachers, Users } from "@/server/db/tables";

export type ClassList = Classes & {
  teacher: Teachers & { user: Users };
  grade: Grades;
};
