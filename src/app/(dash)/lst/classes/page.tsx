import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { ClassesRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { ParamsProps } from "@/types/ParamsProps";
import { classes } from "@/server/db/tables";
import { RequestQuerySchema } from "@/server/schemas/query.schema";
import { ClassesRepository } from "@/server/repository/classes.repository";
import { ClassesService } from "@/server/services/classes.service";

const classesService = new ClassesService(new ClassesRepository(classes));
async function ClassListPage({ searchParams }: ParamsProps) {
  const params = RequestQuerySchema.parse(await searchParams);
  const [data, count] = await classesService.getClasses(params);
  const columns = [
    {
      header: "Class",
      accessor: "name",
      className: "pl-4",
    },
    {
      header: "Cap",
      accessor: "capacity",
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
      <Table columns={columns} renderRow={ClassesRow} data={data} />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={count.total} />
    </div>
  );
}

export default ClassListPage;
