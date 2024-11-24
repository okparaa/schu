"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import SelectField from "../SelectField";
import FileField from "../FileField";
type TeacherFormProps = {
  type: "create" | "update";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

const TeacherSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 chars!" })
    .max(20, { message: "username must be at most 20 chars!" }),
  email: z.string().email("invalid email address!"),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 chars!" }),
  firstName: z.string().min(1, { message: "first name is required!" }),
  lastName: z.string().min(1, { message: "last name is required!" }),
  phone: z.string().min(1, { message: "phone is required!" }),
  address: z.string().min(1, { message: "address is required!" }),
  bloodType: z.string().min(1, { message: "blood type is required!" }),
  birthday: z.date({ message: "birthday is required!" }),
  gender: z.enum(["male", "female"], { message: "sex is required!" }),
  photo: z.instanceof(File, { message: "photo is required!" }),
});

type Inputs = z.infer<typeof TeacherSchema>;

const TeacherForm = ({ type, data }: TeacherFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(TeacherSchema) });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <h1 className="text-xl font-semibold px-4 pb-1 text-center">
        Create A New Teacher
      </h1>
      <form action="" onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row w-full flex-wrap p-2 mx-auto pl-6">
          <InputField
            label="Email"
            defaultValue={data?.email}
            name="email"
            type="email"
            register={register}
            size={20}
            error={errors?.email}
          />
          <InputField
            label="Username"
            defaultValue={data?.username}
            name="username"
            register={register}
            error={errors?.username}
          />
          <InputField
            label="Password"
            defaultValue={data?.password}
            name="password"
            type="password"
            register={register}
            size={20}
            error={errors?.password}
          />
          <InputField
            label="FirstName"
            defaultValue={data?.firstName}
            name="firstName"
            register={register}
            error={errors?.firstName}
          />
          <InputField
            label="LastName"
            defaultValue={data?.lastName}
            name="lastName"
            register={register}
            error={errors?.lastName}
          />
          <InputField
            label="Phone"
            defaultValue={data?.phone}
            name="phone"
            register={register}
            error={errors?.phone}
          />
          <InputField
            label="Address"
            defaultValue={data?.address}
            name="address"
            register={register}
            error={errors?.address}
          />
          <InputField
            label="Blood Type"
            defaultValue={data?.bloodType}
            name="bloodType"
            register={register}
            error={errors?.bloodType}
          />
          <InputField
            label="Birth Day"
            defaultValue={data?.birthday}
            name="birthday"
            register={register}
            error={errors?.birthday}
            type="date"
          />
          <SelectField
            options={[
              { name: "Male", value: "1" },
              { name: "Female", value: "2" },
            ]}
            label="gender"
            defaultValue="1"
            name="gender"
            register={register}
            error={errors?.gender}
          />
          <FileField error={errors.photo} register={register} name="photo" />
          <div className="w-full flex justify-center">
            <button className="self-center bg-blue-400 rounded-md text-white p-2 min-w-[80px] w-[30%]">
              {type === "create" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TeacherForm;
