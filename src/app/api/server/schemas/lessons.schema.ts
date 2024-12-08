import * as z from "zod";
export const LessonsSchema = z.object({
  name: z.string(),
  day: z.any(),
  startTime: z.date(),
  endTime: z.date(),
  teacherId: z.string(),
  subjectId: z.string(),
  classId: z.string(),
});
