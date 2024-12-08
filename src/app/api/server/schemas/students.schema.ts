import * as z from "zod";
export const StudentsSchema = z.object({
  userId: z.string(),
  classId: z.string(),
  gradeId: z.string(),
  parentId: z.string(),
});
