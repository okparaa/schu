import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { dateFormat } from "@/lib/datefmts";
import { PermList } from "@/types/PermList";

export const PermRow = (row: PermList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.name}</td>
      <td>
        {row.rolePerms.reduce(
          (str, rolePerm) =>
            rolePerm.roleId ? str + rolePerm.roles.role + ", " : str,
          ""
        )}
      </td>
      <td className="hidden md:table-cell">{row.slug}</td>
      <td className="hidden md:table-cell">
        {dateFormat(row.updatedAt?.toString())}
      </td>

      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="event" type="update" data={row} />
              <FormModal table="event" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
