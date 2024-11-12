"use client";

import { useState } from "react";

type FormModalProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  id?: string;
};
const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const icons = {
    create: "icon-plus",
    update: "icon-edit",
    delete: "icon-trash",
  };
  const bgColor =
    type === "create"
      ? "bg-orange-700 text-orange-200"
      : type === "update"
      ? "bg-sky-300"
      : "bg-purple-300";

  // w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] min-h-20

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4 p-2">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          delete
        </button>
      </form>
    ) : (
      ""
    );
  };
  return (
    <>
      <button
        className={`${size} flex justify-center items-center rounded-full ${bgColor} ${icons[type]} cursor-pointer text-sm`}
        onClick={() => setOpen(true)}
      ></button>
      {open && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md relative">
            <Form />
            <span
              className=" flex justify-center items-center icon-cancel h-5 w-5 absolute top-[4px] right-1 cursor-pointer rounded-full"
              onClick={() => setOpen(false)}
            ></span>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
