import FormModal from "@/components/FormModal";
import { Classes, Subjects, Users } from "@/server/db/tables";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
type TeacherList = Users & { subjects: Subjects[] } & { classes: Classes[] };
export const TeacherRow = (row: TeacherList) => {
  return (
    <tr
      key={row.id}
      className="border-b  border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex gap-2 p-2">
        <Image
          src={row.photo || "/noavatar.png"}
          alt=""
          height={40}
          width={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link className="underline" href={`/dash/list/teachers/${row.id}`}>
          <div className="flex flex-col">
            <h1 className="font-semibold">
              {row.surname} {row.firstname}
            </h1>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </Link>
      </td>
      <td className="hidden md:table-cell">{row.username}</td>
      <td className="hidden md:table-cell">{row?.subjects.join(", ")}</td>
      <td className="hidden md:table-cell">{row?.classes.join(", ")}</td>
      <td className="hidden lg:table-cell">{row.phone}</td>
      <td className="hidden lg:table-cell">{row.address}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="teacher" type="update" data={row} />
              <FormModal table="teacher" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
