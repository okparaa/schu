import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { ParentList } from "@/types/ParentList";
import Image from "next/image";

export const ParentsRow = (row: ParentList) => {
  return (
    <tr
      key={row.user.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex gap-2 p-2">
        <Image
          src={row.user.photo || "/noavatar.png"}
          alt=""
          height={40}
          width={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h1 className="font-semibold">
            {row.user.surname} {row.user.firstname}
          </h1>
          <p className="text-xs text-gray-500">{row.user.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {row.students
          .reduce((str, student) => str + student.userId + ", ", "")
          .replace(/,+\W+$/, "")}
      </td>
      <td className="hidden lg:table-cell">{row.user.phone}</td>
      <td className="hidden lg:table-cell">{row.user.address}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="parent" type="update" data={row} />
              <FormModal table="parent" type="delete" id={row.user.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
