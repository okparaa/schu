import * as z from "zod";
export const ClassUsersSchema = z.object({
  userId: z.string(),
  classId: z.string(),
});
