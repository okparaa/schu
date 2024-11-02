import { role } from "@/lib/data";
import Link from "next/link";

type SubjectProps = {
  id: string;
  name: string;
  teachers: string[];
};
export const SubjectRow = (row: SubjectProps) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex gap-2 p-2">{row.name}</td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">{row.teachers.join(", ")}</div>
      </td>
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
