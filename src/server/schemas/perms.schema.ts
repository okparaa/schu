import * as z from "zod";

export const PermsSchema = z.object({
  id: z.string(),
});
