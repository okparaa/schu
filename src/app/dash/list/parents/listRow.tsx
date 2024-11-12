import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";

type ParentProps = {
  id: string;
  name: string;
  students: string[];
  photo: string;
  email: string;
  phone: string;
  address: string;
};
export const ParentsRow = (row: ParentProps) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex gap-2 p-2">
        <div className="flex flex-col">
          <h1 className="font-semibold">{row.name}</h1>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{row.students.join(", ")}</td>
      <td className="hidden lg:table-cell">{row.phone}</td>
      <td className="hidden lg:table-cell">{row.address}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="parent" type="update" data={row} />
              <FormModal table="parent" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
