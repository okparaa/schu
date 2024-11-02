"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import { ExamRow } from "./listRow";

const ExamsListPage = () => {
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
        <h1 className="font-semibold text-lg hidden md:block">All Exams</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <span className="icon-plus i-btn"></span>}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={ExamRow} data={examsData} />
      {/* {renderRow} */}
      <Pagination />
    </div>
  );
};

export default ExamsListPage;
