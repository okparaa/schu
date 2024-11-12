import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
type AssignmentProps = {
  id: string;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

export const AssignmentRow = (row: AssignmentProps) => {
  return (
    <tr
      key={row.subject}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.subject}</td>
      <td className="">{row.class}</td>
      <td className="hidden md:table-cell">{row.teacher}</td>
      <td className="hidden md:table-cell">{row.dueDate}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="assignment" type="update" data={row} />
              <FormModal table="assignment" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
