import * as z from "zod";
export const RolesSchema = z.object({
  id: z.string(),
  name: z.enum(["teacher"]),
  description: z.string(),
});

export const UserRolesSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});
