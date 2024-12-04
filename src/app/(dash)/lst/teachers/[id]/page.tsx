import Announcements from "@/components/Bulletins";
import FormModal from "@/components/FormModal";
import Metrics from "@/components/Metrics";
import BigCalendar from "@/components/plugins/BigCalendar";
import { calendarEvents } from "@/lib/data";
import { teachers } from "@/server/db/tables";
import { TeachersRepository } from "@/server/repository/teachers.repository";
import { TeachersService } from "@/server/services/teachers.service";
import { ParamsProps } from "@/types/ParamsProps";
import Image from "next/image";
import Link from "next/link";

const teacherService = new TeachersService(new TeachersRepository(teachers));
async function SingleTeacherPage({ params }: ParamsProps) {
  const id = (await params).id;
  const teacher = await teacherService.getTeacher(id as string);

  return (
    <div className="flex flex-col p-2 flex-1 xl:flex-row gap-2">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex items-center gap-2">
            <div className="w-1/3 flex justify-center">
              <Image
                src={`${teacher?.user?.photo || "/noavatar.png"}`}
                alt=""
                width={144}
                height={144}
                className="rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">
                  {teacher?.user?.surname} {teacher?.user?.lastname}
                </h1>
                <FormModal table="teacher" type="update" data={teacher} />
              </div>
              <p className="text-sm to-gray-500">
                {teacher?.user?.description}
              </p>
              <div className="flex justify-between items-center gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-users-outline"></i>
                  <span>{teacher?.user?.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-table"></i>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-mail-1"></i>
                  <span>{teacher?.user?.email}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-phone-outline"></i>
                  <span>{teacher?.user?.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 gap-2 lg:justify-center flex justify-between flex-wrap">
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[49.3%] lg:w-[48%]">
              <i className="icon-star-empty outline-1 outline-gray-800 h-6 w-6"></i>
              <div className="">
                <h1 className="text-lg font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[49.3%] lg:w-[48%]">
              <i className="icon-bell h-6 w-6"></i>
              <div className="">
                <h1 className="text-lg font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[49.3%] lg:w-[48%]">
              <i className="icon-light-up h-6 w-6"></i>
              <div className="">
                <h1 className="text-lg font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[49.3%] lg:w-[48%]">
              <i className="icon-vector h-6 w-6"></i>
              <div className="">
                <h1 className="text-lg font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 bg-white rounded-md p-4">
          <BigCalendar events={calendarEvents} title="Teacher's Schedule" />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex gap-2 flex-col">
        <div className="p-4 rounded-md bg-white">
          <h1 className="text-lg font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs to-gray-500 justify-center">
            <Link
              className="p-2 rounded-md bg-pink-300"
              href={`/lst/classes?tid=${id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-2 rounded-md bg-purple-300"
              href={`/lst/students?tid=${id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-2 rounded-md bg-green-300"
              href={`/lst/exams?tid=${id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-2 rounded-md bg-slate-300"
              href={`/lst/lessons?tid=${id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-2 rounded-md bg-stone-300"
              href={`/lst/assignments?tid=${id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Metrics />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleTeacherPage;
