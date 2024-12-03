import { Classes, Grades, Students, Users } from "@/server/db/tables";

export type StudentList = Students & {
  grade: Grades;
  user: Users;
  class: Classes;
};
