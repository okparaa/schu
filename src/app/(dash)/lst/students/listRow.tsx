import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { StudentList } from "@/types/StudentList";
import Image from "next/image";
import Link from "next/link";

export const StudentRow = (row: StudentList) => {
  return (
    <tr
      key={row.user.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm"
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
          <Link className="underline" href={`/lst/students/${row.id}`}>
            <h1 className="font-semibold">
              {row.user.surname} {row.user.lastname}
            </h1>
          </Link>
          <p className="text-xs font-semibold text-gray-500">
            {row.class.name}
          </p>
        </div>
      </td>
      <td className="hidden md:table-cell">{row.id}</td>
      <td className="hidden md:table-cell w-5">{row.grade?.level}</td>
      <td className="hidden lg:table-cell">{row.user.phone}</td>
      <td className="hidden lg:table-cell">{row.user.address}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="student" type="update" data={row} />
              <FormModal table="student" type="delete" id={row.user.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
