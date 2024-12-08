import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { dateFormat } from "@/lib/datefmts";
import { EventList } from "@/types/EventList";

export const EventRow = (row: EventList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex items-center p-4 py-3">{row.title}</td>
      <td>{row.class.name}</td>
      <td className="hidden md:table-cell">
        {dateFormat(row.startTime?.toString())}
      </td>
      <td className="hidden md:table-cell">
        {new Date(row.startTime as unknown as string)?.toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        )}
      </td>
      <td className="hidden md:table-cell">
        {new Date(row.endTime as unknown as string)?.toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        )}
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
