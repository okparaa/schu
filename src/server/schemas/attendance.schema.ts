import * as z from "zod";

export const AttendanceSchema = z.object({
  name: z.string(),
  present: z.string(),
  date: z.string(),
  studentId: z.string(),
  lessonId: z.string(),
});
