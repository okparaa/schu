import * as z from "zod";

export const AssignmentsSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  dueDate: z.string(),
  lessonId: z.string(),
});
