import * as z from "zod";
export const BulletinsSchema = z.object({
  title: z.string(),
  classId: z.string(),
  description: z.string(),
  date: z.date(),
});
