"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { ResultRow } from "./listRow";
import FormModal from "@/components/FormModal";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { useSearchParams } from "next/navigation";
import useResults from "@/app/api/lst/results/results.query";
import { ResultProps } from "@/types/ResultList";
import { exams } from "@/app/api/server/db/tables";
import Loading from "@/app/loading";

function ResultListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useResults();
  if (isLoading) return <Loading />;

  const resultsData = data?.records.map((result) => {
    const assessment = result.assignment || result.exam;
    if (!assessment) return null;
    const isExam = "startTime" in assessment;
    return {
      id: result.id,
      title: assessment.lesson.subject.name,
      studentSurname: result.student.user.surname,
      studentFirstname: result.student.user.firstname,
      teacherSurname: assessment.lesson.teacher.user.surname,
      teacherFirstname: assessment.lesson.teacher.user.firstname,
      score: result.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? exams.startTime : assessment.startDate,
    };
  });

  const columns = [
    {
      header: "Subject",
      accessor: "subject",
      className: "pl-4",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
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
        <h1 className="font-semibold text-lg hidden md:block">All Results</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={ResultRow}
        data={resultsData as ResultProps[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default ResultListPage;
