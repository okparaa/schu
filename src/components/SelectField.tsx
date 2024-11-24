import { SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SelectFieldProps = {
  register: any;
  name: string;
  defaultValue: string;
  options: Array<{ name: string; value: string }>;
  size?: number;
  label: string;
  error?: FieldError;
  inputProps?: SelectHTMLAttributes<HTMLSelectElement>;
};
const SelectField = ({
  register,
  defaultValue,
  size = 90,
  label,
  options = [],
  error,
  name,
  inputProps,
}: SelectFieldProps) => {
  return (
    <div className="w-full lg:w-1/2 my-2">
      <select
        {...register(name)}
        {...inputProps}
        defaultValue={defaultValue}
        className={`border-[1.5px] bg-white p-[7px] rounded-md text-sm w-[${size}%] ${
          error?.message ? "" : ""
        }`}
      >
        <option value="" className="text-gray-50">
          Choose {label}
        </option>
        {options.map((opt, idx) => {
          return (
            <option key={idx} value={opt.value}>
              {opt.name}
            </option>
          );
        })}
      </select>

      <p className="text-[12px] line-clamp-1 text-red-500 font-semibold h-[14px] -m-[3px] pl-1">
        {error?.message && error?.message.toString()}
      </p>
    </div>
  );
};

export default SelectField;
