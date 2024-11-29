import * as z from "zod";
export const SubjectsSchema = z.object({
  name: z.string(),
  description: z.string(),
});
