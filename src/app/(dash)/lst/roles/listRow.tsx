import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { RoleList } from "@/types/RoleList";

export const RoleRow = (row: RoleList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.role.toUpperCase()}</td>
      <td>
        {row.rolesPerms.reduce(
          (str, rolePerms) =>
            rolePerms.perm ? str + rolePerms.perm.name + ", " : str,
          ""
        )}
      </td>
      <td className="hidden md:table-cell">{row.status}</td>
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
