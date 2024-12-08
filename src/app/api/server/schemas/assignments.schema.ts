import * as z from "zod";

export const AssignmentsSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  dueDate: z.date(),
  lessonId: z.string(),
});
