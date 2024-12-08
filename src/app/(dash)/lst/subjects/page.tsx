"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { SubjectRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { useSearchParams } from "next/navigation";
import useSubjects from "@/app/api/lst/subjects/subjects.query";
import Loading from "@/app/loading";
import { SubjectList } from "@/types/SubjectList";

function SubjectListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useSubjects();
  if (isLoading) return <Loading />;
  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
      className: "pl-2",
    },
    {
      header: "Teachers",
      accessor: "teachers",
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
        <h1 className="font-semibold text-lg hidden md:block">All Subjects</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={SubjectRow}
        data={data?.records as SubjectList[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default SubjectListPage;
