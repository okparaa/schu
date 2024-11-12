import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
type ResultProps = {
  id: string;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

export const ResultRow = (row: ResultProps) => {
  return (
    <tr
      key={row.subject}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.subject}</td>
      <td>{row.student}</td>
      <td className="hidden md:table-cell">{row.score}</td>
      <td className="hidden md:table-cell">{row.teacher}</td>
      <td className="hidden md:table-cell">{row.class}</td>
      <td className="hidden md:table-cell">{row.date}</td>
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
