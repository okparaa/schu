import { ITEMS_PER_PAGE } from "@/lib/settings";
import * as z from "zod";

export const RequestQuerySchema = z.object({
  p: z.coerce.number().default(1),
  // .pipe(
  //   z.coerce
  //     .number()
  //     .int("must be integer")
  //     .positive("must be positive number")
  // ),
  t: z.coerce.number().default(ITEMS_PER_PAGE),
  // .pipe(
  //   z.coerce
  //     .number()
  //     .int("must be integer")
  //     .positive("must be positive number")
  // ),
});
