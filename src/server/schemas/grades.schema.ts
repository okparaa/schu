import * as z from "zod";
export const GradesSchema = z.object({
  level: z.string(),
});
