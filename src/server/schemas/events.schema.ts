import * as z from "zod";
export const EventsSchema = z.object({
  title: z.string(),
  description: z.string(),
  classId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});
