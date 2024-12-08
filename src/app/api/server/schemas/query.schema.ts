import { ITEMS_PER_PAGE } from "@/lib/settings";
import * as z from "zod";

export const RequestQuerySchema = z.object({
  pg: z.coerce.number().default(1),
  tk: z.coerce.number().default(ITEMS_PER_PAGE),
  cid: z.string().optional(),
  lid: z.string().optional(),
  sach: z.string().optional(),
  tid: z.string().optional(),
  std: z.string().optional(),
  stdcid: z.string().optional(),
});

export type RequestQueryType = z.infer<typeof RequestQuerySchema>;
