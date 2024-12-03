import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { TeacherRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { users } from "@/server/db/tables";
import { ParamsProps } from "@/types/ParamsProps";
import { RequestQuerySchema } from "@/server/schemas/query.schema";
import { TeachersRepository } from "@/server/repository/teachers.repository";
import { TeachersService } from "@/server/services/teachers.service";
const teacherService = new TeachersService(new TeachersRepository(users));

async function TeachersPage({ searchParams }: ParamsProps) {
  const params = RequestQuerySchema.parse(await searchParams);
  const [data, count] = await teacherService.getTeachers(params);

  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "pl-2",
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
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
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
      <Table columns={columns} renderRow={TeacherRow} data={data} />

      <Pagination page={params.pg} total={count.total} />
    </div>
  );
}

export default TeachersPage;
