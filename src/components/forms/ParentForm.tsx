"use client";

import { UsersSchema } from "@/app/api/server/schemas/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import FileField from "../FileField";
import InputField from "../InputField";
import SelectField from "../SelectField";

type ParentFormProps = {
  type: "create" | "update";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

type Inputs = z.infer<typeof UsersSchema>;

const ParentForm = ({ type, data }: ParentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(UsersSchema) });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <h1 className="text-xl font-semibold px-4 pb-1 text-center">
        Create A New Student
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
            defaultValue={data?.firstname}
            name="firstName"
            register={register}
            error={errors?.firstname}
          />
          <InputField
            label="LastName"
            defaultValue={data?.lastName}
            name="lastName"
            register={register}
            error={errors?.lastname}
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
            defaultValue={data?.dateOfBirth}
            name="birthday"
            register={register}
            error={errors?.dateOfBirth}
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
          <FileField
            error={errors.photo as FieldError}
            register={register}
            name="photo"
          />
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

export default ParentForm;
