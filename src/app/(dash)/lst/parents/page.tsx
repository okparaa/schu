"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { ParentsRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { useSearchParams } from "next/navigation";
import useParents from "@/app/api/lst/parents/parents.query";
import Loading from "@/app/loading";
import { ParentList } from "@/types/ParentList";

function ParentsListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useParents();
  if (isLoading) return <Loading />;
  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "pl-4 md:w-1/3",
    },
    {
      header: "Student",
      accessor: "students",
      className: "hidden md:table-cell align-middle text-center",
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
      className: "text-center lg:table-cell",
    },
  ];
  return (
    <div className="flex-1 bg-white p-4 rounded-md m-1">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg hidden md:block">Parents</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={ParentsRow}
        data={data?.records as ParentList[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default ParentsListPage;
