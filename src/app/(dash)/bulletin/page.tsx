import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { BulletinRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { ParamsProps } from "@/types/ParamsProps";
import { bulletins } from "@/app/api/server/db/tables";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { BulletinsRepository } from "@/app/api/server/repository/bulletins.repository";
import { BulletinsService } from "@/app/api/server/services/bulletins.service";

const bulletinsService = new BulletinsService(
  new BulletinsRepository(bulletins)
);
async function BulletinsListPage({ searchParams }: ParamsProps) {
  const params = RequestQuerySchema.parse(await searchParams);
  const [data, count] = await bulletinsService.getBulletins(params);
  const columns = [
    {
      header: "Title",
      accessor: "title",
      className: "pl-4",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
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
        <h1 className="font-semibold text-lg hidden md:block">
          All Announcements
        </h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && (
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={BulletinRow} data={data} />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={count.total} />
    </div>
  );
}

export default BulletinsListPage;
