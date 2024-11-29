import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
type ClassProps = {
  id: string;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

export const ClassesRow = (row: ClassProps) => {
  return (
    <tr
      key={row.name}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.name}</td>
      <td className="">{row.capacity}</td>
      <td className="hidden md:table-cell">{row.grade}</td>
      <td className="hidden md:table-cell">{row.supervisor}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="class" type="update" data={row} />
              <FormModal table="class" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
