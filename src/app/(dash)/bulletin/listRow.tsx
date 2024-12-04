import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { BulletinList } from "@/types/BulletinList";

export const BulletinRow = (row: BulletinList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.title}</td>
      <td>{row.class.name}</td>
      <td className="hidden md:table-cell">
        <h1>{new Intl.DateTimeFormat("en-US").format(row.date as Date)}</h1>
        <p>{row.description}</p>
      </td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="announcement" type="update" data={row} />
              <FormModal table="announcement" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
