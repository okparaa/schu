import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { TeacherList } from "@/types/TeacherList";
export const TeacherRow = (row: TeacherList) => {
  // console.log(row);

  return (
    <tr
      key={row.id}
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
          <Link className="underline" href={`/lst/teachers/${row.id}`}>
            <h1 className="font-semibold">
              {row.user.surname} {row.user.lastname}
            </h1>
          </Link>
          <p className="text-xs text-gray-500">{row.user.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{row.user.username}</td>
      <td className="hidden md:table-cell">
        {row?.lessons
          .reduce(
            (str, lesson) =>
              lesson.subject ? str + lesson.subject.name + ", " : str,
            ""
          )
          .replace(/,+\W+$/, "")}
      </td>
      <td className="hidden md:table-cell">
        {row.classes
          ?.reduce(
            (str, clazz) => (clazz.name ? str + clazz.name + " , " : str),
            ""
          )
          .replace(/,+\W+$/, "")}
      </td>
      <td className="hidden lg:table-cell">{row.user.phone}</td>
      <td className="hidden lg:table-cell">{row.user.address}</td>
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
