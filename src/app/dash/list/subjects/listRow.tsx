import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";

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
          {role == "admin" && (
            <>
              <FormModal table="subject" type="update" data={row} />
              <FormModal table="subject" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
