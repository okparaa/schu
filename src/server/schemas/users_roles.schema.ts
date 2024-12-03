import * as z from "zod";
export const UsersRolesSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});
