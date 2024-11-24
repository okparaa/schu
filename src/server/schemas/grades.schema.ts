import * as z from "zod";
export const GradesSchema = z.object({
  id: z.string(),
  level: z.string(),
});

export const UserGradeSchema = z.object({
  userId: z.string(),
  gradeId: z.string(),
});
