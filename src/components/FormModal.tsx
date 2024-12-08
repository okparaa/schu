"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  ...Loading,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  ...Loading,
});

const forms: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

type FormModalProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "role"
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
const FormModal = ({ table, type, id, data }: FormModalProps) => {
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
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none self-center">
          delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };
  return (
    <>
      <button
        className={`${size} flex justify-center items-center rounded-full ${bgColor} ${icons[type]} cursor-pointer text-sm`}
        onClick={() => setOpen(true)}
      ></button>
      {open && (
        <>
          <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-60 z-10 flex justify-center items-center"></div>
          <div className="bg-white mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md z-20 absolute min-w-36">
            <Form />
            <span
              className="flex justify-center items-center icon-cancel h-8 w-8 absolute top-2 right-1 cursor-pointer text-white rounded-full bg-red-500"
              onClick={() => setOpen(false)}
            ></span>
          </div>
        </>
      )}
    </>
  );
};

export default FormModal;
