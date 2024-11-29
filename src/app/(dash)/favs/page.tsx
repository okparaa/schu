"use client";

import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import BigCalendar from "@/components/plugins/BigCalendar";
import { calendarEvents } from "@/lib/data";

const StudentPage = () => {
  return (
    <div className="p-2 flex flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col gap-2 bg-white">
        <BigCalendar title="Schedule (4A)" events={calendarEvents} />
      </div>
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
