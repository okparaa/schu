import * as z from "zod";

export const ContentSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "should be string",
    })
    .optional(),
  description: z.string().optional(),
  stock: z
    .number({
      required_error: "username is required",
      invalid_type_error: "should be string",
    })
    .optional(),
  price: z
    .number({
      required_error: "username is required",
      invalid_type_error: "should be string",
    })
    .optional()
    .refine((input) => input === undefined || input === null || input > 0),
});
