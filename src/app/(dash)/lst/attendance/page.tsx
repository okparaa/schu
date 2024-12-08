"use client";
import useAttendance from "@/app/api/lst/attendance/attendance.query";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import Loading from "@/app/loading";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { AttendanceRow } from "./listRow";
import { AttendanceList } from "@/types/AttendanceList";

function AttendanceListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useAttendance();

  if (isLoading) return <Loading />;
  const columns = [
    {
      header: "Subject",
      accessor: "subject",
      className: "pl-4",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "text-center lg:table-cell",
    },
  ];
  return (
    <div className="flex-1 bg-white p-4 rounded-md m-1">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg hidden md:block">
          All Assignments
        </h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={AttendanceRow}
        data={data?.records as AttendanceList[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default AttendanceListPage;
