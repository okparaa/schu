import * as z from "zod";
export const RolesSchema = z.object({
  name: z.string(),
  description: z.string(),
});
