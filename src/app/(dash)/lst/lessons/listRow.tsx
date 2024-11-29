import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
type LessonProps = {
  id: string;
  subject: string;
  class: string;
  teacher: string;
};

export const LessonRow = (row: LessonProps) => {
  return (
    <tr
      key={row.subject}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.subject}</td>
      <td className="">{row.class}</td>
      <td className="hidden md:table-cell">{row.teacher}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="lesson" type="update" data={row} />
              <FormModal table="lesson" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
