import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { AssignmentList } from "@/types/AssignmentList";

export const AssignmentRow = (row: AssignmentList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.lesson.subject.name}</td>
      <td className="">{row.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {row.lesson.teacher.user.surname} {row.lesson.teacher.user.firstname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(row.dueDate as Date)}
      </td>
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