import * as z from "zod";
export const RolesSchema = z.object({
  role: z.string(),
  description: z.string(),
});
