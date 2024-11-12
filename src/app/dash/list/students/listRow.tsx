import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type StudentProps = {
  id: string;
  student_id: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};
export const StudentRow = (row: StudentProps) => {
  return (
    <tr
      key={row.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm"
    >
      <td className="flex gap-2 p-2">
        <Image
          src={row.photo}
          alt=""
          height={40}
          width={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link className="underline" href={`/dash/list/students/${row.id}`}>
          <div className="flex flex-col">
            <h1 className="font-semibold">{row.name}</h1>
            <p className="text-xs text-gray-500">{row.class}</p>
          </div>
        </Link>
      </td>
      <td className="hidden md:table-cell">{row.student_id}</td>
      <td className="hidden md:table-cell">{row.grade}</td>
      <td className="hidden lg:table-cell">{row.phone}</td>
      <td className="hidden lg:table-cell">{row.address}</td>
      <td className="w-32">
        <div className="flex items-center justify-center gap-3">
          {role == "admin" && (
            <>
              <FormModal table="student" type="update" data={row} />
              <FormModal table="student" type="delete" id={row.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
