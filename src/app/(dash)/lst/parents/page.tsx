import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, parentsData } from "@/lib/data";
import { ParentsRow } from "./listRow";
import FormModal from "@/components/FormModal";

const ParentsListPage = () => {
  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "pl-4",
    },
    {
      header: "Student names",
      accessor: "students",
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
      <Table columns={columns} renderRow={ParentsRow} data={parentsData} />
      {/* {renderRow} */}
      <Pagination />
    </div>
  );
};

export default ParentsListPage;
