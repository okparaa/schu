import Announcements from "@/components/Bulletins";
import FormModal from "@/components/FormModal";
import Metrics from "@/components/Metrics";
import BigCalendar from "@/components/plugins/BigCalendar";
import { calendarEvents } from "@/lib/data";
import { students } from "@/app/api/server/db/tables";
import { StudentsRepository } from "@/app/api/server/repository/students.repository";
import { StudentsService } from "@/app/api/server/services/students.service";
import { ParamsProps } from "@/types/ParamsProps";
import Image from "next/image";
import Link from "next/link";

const studentsService = new StudentsService(new StudentsRepository(students));
async function SingleStudentPage({ params }: ParamsProps) {
  const id = (await params).id;
  const student = await studentsService.getStudent(id as string);
  return (
    <div className="flex flex-col p-2 flex-1 xl:flex-row gap-2">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex items-center gap-2">
            <div className="w-1/3 flex justify-center">
              <Image
                src={student?.user?.photo || "/noavatar.png"}
                alt=""
                width={144}
                height={144}
                className="rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">
                  {student?.user?.surname} {student?.user?.lastname}
                </h1>
                <FormModal table="student" type="update" data={student} />
              </div>
              <p className="text-sm to-gray-500">
                {student?.user?.description}
              </p>
              <div className="flex justify-between items-center gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-users-outline"></i>
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-table"></i>
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-mail-1"></i>
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full">
                  <i className="icon-phone-outline"></i>
                  <span>08133709989</span>
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
                <h1 className="text-lg font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[49.3%] lg:w-[48%]">
              <i className="icon-light-up h-6 w-6"></i>
              <div className="">
                <h1 className="text-lg font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[49.3%] lg:w-[48%]">
              <i className="icon-vector h-6 w-6"></i>
              <div className="">
                <h1 className="text-lg font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 bg-white rounded-md p-4">
          <BigCalendar events={calendarEvents} title="Student's Schedule" />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex gap-2 flex-col">
        <div className="p-4 rounded-md bg-white">
          <h1 className="text-lg font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs to-gray-500 justify-start">
            <Link
              className="p-2 rounded-md bg-pink-300"
              href={`/lst/lessons?std=${id}`}
            >
              Lessons
            </Link>
            <Link
              className="p-2 rounded-md bg-purple-300"
              href={`/lst/teachers?std=${id}`}
            >
              Teachers
            </Link>
            <Link
              className="p-2 rounded-md bg-green-300"
              href={`/lst/results?std=${id}`}
            >
              Results
            </Link>
            <Link
              className="p-2 rounded-md bg-slate-300"
              href={`/lst/exams?std=${id}`}
            >
              Exams
            </Link>
            <Link
              className="p-2 rounded-md bg-stone-300"
              href={`/lst/assignments?std=${id}`}
            >
              Assignments
            </Link>
          </div>
        </div>
        <Metrics />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleStudentPage;
