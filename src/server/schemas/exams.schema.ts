import * as z from "zod";
export const ExamsSchema = z.object({
  title: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  lessonId: z.string(),
});
