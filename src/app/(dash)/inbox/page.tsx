import Announcements from "@/components/Bulletins";
import BigCalendar from "@/components/plugins/BigCalendar";
import { calendarEvents } from "@/lib/data";

const TeacherPage = () => {
  return (
    <div className="flex-1 p-2 flex flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col gap-2 bg-white">
        <BigCalendar title="Schedule" events={calendarEvents} />
      </div>
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
