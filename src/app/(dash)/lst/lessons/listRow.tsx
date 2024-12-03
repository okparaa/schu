import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { LessonList } from "@/types/LessonList";

export const LessonRow = (row: LessonList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.subject.name}</td>
      <td className="">{row.class.name}</td>
      <td className="hidden md:table-cell">
        {row.teacher.user.surname} {row.teacher.user.lastname}
      </td>
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
