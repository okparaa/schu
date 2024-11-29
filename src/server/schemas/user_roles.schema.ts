import * as z from "zod";
export const UserRolesSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  userType: z.string(),
});
