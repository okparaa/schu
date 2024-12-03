import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { AssignmentRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { ParamsProps } from "@/types/ParamsProps";
import { assignments } from "@/server/db/tables";
import { RequestQuerySchema } from "@/server/schemas/query.schema";
import { AssignmentsService } from "@/server/services/assignments.service";
import { AssignmentsRepository } from "@/server/repository/assignments.repository";

const assignmentsService = new AssignmentsService(
  new AssignmentsRepository(assignments)
);
async function AssignmentsListPage({ searchParams }: ParamsProps) {
  const params = RequestQuerySchema.parse(await searchParams);
  const [data, count] = await assignmentsService.getAssignments(params);
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
      <Table columns={columns} renderRow={AssignmentRow} data={data} />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={count.total} />
    </div>
  );
}

export default AssignmentsListPage;
