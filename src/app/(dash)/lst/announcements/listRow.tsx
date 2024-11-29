import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
type AnnouncementProps = {
  id: string;
  title: string;
  class: string;
  date: string;
};

export const AnnouncementRow = (row: AnnouncementProps) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.title}</td>
      <td>{row.class}</td>
      <td className="hidden md:table-cell">{row.date}</td>
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
