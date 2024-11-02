import { role } from "@/lib/data";
import Link from "next/link";
type ExamProps = {
  id: string;
  subject: string;
  class: string;
  staff: string;
  date: string;
};

export const ExamRow = (row: ExamProps) => {
  return (
    <tr
      key={row.subject}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.subject}</td>
      <td className="">{row.class}</td>
      <td className="hidden md:table-cell">{row.staff}</td>
      <td className="hidden md:table-cell">{row.date}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          <Link
            className="icon-columns i-btn"
            href={`/dash/list/staff/${row.id}`}
          ></Link>
          {role == "admin" && (
            <span className="icon-cancel i-btn" id={`${row.id}`}></span>
          )}
        </div>
      </td>
    </tr>
  );
};
