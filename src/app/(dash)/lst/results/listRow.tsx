import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
type ResultProps = {
  id: string;
  title: string;
  studentSurname: string;
  studentFirstname: string;
  teacherSurname: string;
  teacherFirstname: string;
  score: string;
  className: string;
  startTime: Date;
};

export const ResultRow = (row: ResultProps) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.title}</td>
      <td>
        {row.studentSurname} {row.studentFirstname}
      </td>
      <td className="hidden md:table-cell">{row.score}</td>
      <td className="hidden md:table-cell">
        {row.teacherSurname}
        {row.teacherFirstname}
      </td>
      <td className="hidden md:table-cell">{row.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(row.startTime)}
      </td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="result" type="update" data={row} />
              <FormModal table="result" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};