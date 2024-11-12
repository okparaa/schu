"use client";
type TeacherFormProps = {
  type: "create" | "update";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};
const TeacherForm = ({ type, data }: TeacherFormProps) => {
  return (
    <div className="">
      <input type="text" />
    </div>
  );
};

export default TeacherForm;
