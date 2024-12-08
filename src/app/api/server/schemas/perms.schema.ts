import * as z from "zod";

export const PermsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
});
