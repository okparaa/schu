import * as z from "zod";
export const UserLessonsSchema = z.object({
  userId: z.string(),
  lessonId: z.string(),
});
