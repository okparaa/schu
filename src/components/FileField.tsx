import { FieldError } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
type FileFieldProps = {
  register: any;
  name: string;
  size?: number;
  error?: FieldError;
};
const FileField = ({ register, error, name, size = 90 }: FileFieldProps) => {
  return (
    <div className="w-full lg:w-1/2 my-2">
      <label
        htmlFor="upld"
        className={`text-base text-gray-500 flex items-center justify-center border rounded-lg h-8 w-[${size}%] cursor-pointer gap-4`}
      >
        <span className="icon-upload-cloud-outline text-2xl"></span>
        <span>Upload a photo</span>
      </label>
      <input id="upld" type="file" {...register(name)} className="hidden" />
      <p className="text-[12px] line-clamp-1 text-red-500 font-semibold h-[20px] -m-[3px] pl-1">
        {error?.message && error?.message.toString()}
      </p>
    </div>
  );
};

export default FileField;
