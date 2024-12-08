"use client";
import usePerms from "@/app/api/lst/perms/perms.query";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { PermRow } from "./listRow";
import { PermList } from "@/types/PermList";
import Loading from "@/app/loading";

function PermsListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = usePerms();
  if (isLoading) return <Loading />;
  const columns = [
    {
      header: "Permits",
      accessor: "perm",
      className: "pl-4",
    },
    {
      header: "Roles",
      accessor: "roles",
    },
    {
      header: "Modified",
      accessor: "date",
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
        <h1 className="font-semibold text-lg hidden md:block">All Events</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={PermRow}
        data={data?.records as PermList[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default PermsListPage;
