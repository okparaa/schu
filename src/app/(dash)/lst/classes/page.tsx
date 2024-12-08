"use client";
import useClasses from "@/app/api/lst/events copy/classes.query";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import Loading from "@/app/loading";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { ClassList } from "@/types/ClassList";
import { useSearchParams } from "next/navigation";
import { ClassesRow } from "./listRow";

function ClassListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useClasses();
  if (isLoading) return <Loading />;
  const columns = [
    {
      header: "Class",
      accessor: "name",
      className: "pl-4",
    },
    {
      header: "Capacity",
      accessor: "cap",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
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
        <h1 className="font-semibold text-lg hidden md:block">All Classes</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={ClassesRow}
        data={data?.records as ClassList[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default ClassListPage;
