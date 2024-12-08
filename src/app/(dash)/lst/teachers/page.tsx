"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { TeacherRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { useSearchParams } from "next/navigation";
import useTeachers from "@/app/api/lst/teachers/teachers.query";
import Loading from "@/app/loading";
import { TeacherList } from "@/types/TeacherList";

function TeachersPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useTeachers();

  if (isLoading) return <Loading />;

  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "pl-2 w-1/4",
    },
    {
      header: "Teacher ID",
      accessor: "staff_id",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "classes",
      className: "hidden md:table-cell w-[43px]",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "text-center lg:table-cell w-1",
    },
  ];
  return (
    <div className="flex-1 bg-white p-4 rounded-md m-1">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg hidden md:block">All Teachers</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={TeacherRow}
        data={data?.records as TeacherList[]}
      />

      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default TeachersPage;
