import * as z from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const UsersSchema = z.object({
  surname: z
    .string({
      required_error: "surname is required",
      invalid_type_error: "should be string",
    })
    .max(30, { message: "surname, too long" }),
  role: z.string({ invalid_type_error: "should be string" }),
  firstname: z
    .string({
      required_error: "firstname is required",
      invalid_type_error: "should be string",
    })
    .max(30, { message: "firstname too long" }),
  lastname: z
    .string({
      required_error: "lastname is required",
      invalid_type_error: "should be string",
    })
    .max(30, { message: "lastname too long" }),
  photo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  username: z.string({
    required_error: "username is required",
    invalid_type_error: "should be string",
  }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "should be string",
  }),
  pass: z
    .string({
      required_error: "password is required",
      invalid_type_error: "should be string",
    })
    .optional(),
  email: z.string().email({ message: "invalid email address" }),
  phone: z
    .string()
    .regex(/^(080|081|090|091|070|071)[0-9]{8}$/, { message: "invalid phone" }),
  bloodType: z.enum(["A", "A+", "O", "O+"]),
  dateOfBirth: z.date(),
  address: z.string(),
  gender: z.enum(["male", "female"]),
  userTypeId: z.string(),
});

export const SigninSchema = UsersSchema.pick({
  username: true,
  password: true,
});
