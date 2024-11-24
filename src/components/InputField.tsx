import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
type InputFieldProps = {
  label?: string;
  type?: string;
  register: any;
  name: string;
  defaultValue: string;
  size?: number;
  error?: FieldError;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};
const InputField = ({
  label,
  type = "text",
  register,
  defaultValue,
  size = 90,
  error,
  name,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="w-full lg:w-1/2 my-1">
      {/* <label className="text-xs text-gray-500">{label}</label> */}
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        {...inputProps}
        defaultValue={defaultValue}
        className={`outline-none focus:border-slate-400 border-[1.5px] p-[7px] rounded-md text-sm w-[${size}%] ${
          error?.message ? "" : ""
        }`}
      />

      <p className="text-[12px] line-clamp-1 text-red-500 font-semibold h-[18px] -m-[3px] pl-1">
        {error?.message && error?.message.toString()}
      </p>
    </div>
  );
};

export default InputField;
