import { Lessons, Subjects, Teachers, Users } from "@/server/db/tables";

export type SubjectList = Subjects & {
  lessons: (Lessons & { teacher: Teachers & { user: Users } })[];
};
