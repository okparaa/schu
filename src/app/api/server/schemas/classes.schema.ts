import * as z from "zod";
export const ClassesSchema = z.object({
  name: z.string(),
  capacity: z.enum(["20", "30", "40", "23", "16", "25"]),
  teacherId: z.string(),
  gradeId: z.string(),
});
