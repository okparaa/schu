import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import { StudentRow } from "./listRow";
import FormModal from "@/components/FormModal";

const StudentsListPage = () => {
  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "pl-4",
    },
    {
      header: "Student Id",
      accessor: "student_id",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
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
        <h1 className="font-semibold text-lg hidden md:block">All Students</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={StudentRow} data={studentsData} />
      {/* {renderRow} */}
      <Pagination />
    </div>
  );
};

export default StudentsListPage;
