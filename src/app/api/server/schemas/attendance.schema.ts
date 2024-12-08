import * as z from "zod";

export const AttendanceSchema = z.object({
  present: z.boolean(),
  date: z.date(),
  studentId: z.string(),
  lessonId: z.string(),
});
