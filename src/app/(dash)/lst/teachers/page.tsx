import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { TeacherRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { UsersService } from "@/server/services/users.service";
import { UsersRepository } from "@/server/repository/users.repository";
import { users } from "@/server/db/tables";
import { ParamsProps } from "@/types/params";
import { RequestQuerySchema } from "@/server/schemas/query.schema";
// import { seed } from "@/server/db/seed";

const userService = new UsersService(new UsersRepository(users));

async function TeachersPage({ searchParams }: ParamsProps) {
  const param = RequestQuerySchema.parse(await searchParams);

  const { teachers, total } = await userService.getUsers(
    param.t,
    param.p,
    "teacher",
    param?.cid as string
  );

  // await seed();
  const [count] = total;
  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "pl-4",
    },
    {
      header: "Teacher ID",
      accessor: "staff_id",
      className: "hidden md:table-cell",
    },
    {
      header: "Courses",
      accessor: "courses",
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
      <Table columns={columns} renderRow={TeacherRow} data={teachers} />

      <Pagination page={param.p} total={count.total} />
    </div>
  );
}

export default TeachersPage;
