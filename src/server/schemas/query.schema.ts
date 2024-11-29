import { ITEMS_PER_PAGE } from "@/lib/settings";
import * as z from "zod";

export const RequestQuerySchema = z.object({
  p: z.coerce.number().default(1),
  t: z.coerce.number().default(ITEMS_PER_PAGE),
  cid: z.string().optional(),
  lid: z.string().optional(),
});
