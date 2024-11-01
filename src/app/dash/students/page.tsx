"use client";

import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import BigCalendar from "@/components/plugins/BigCalendar";
import dayjs from "dayjs";

const StudentPage = () => {
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      start: dayjs().hour(9).minute(0),
      end: dayjs().hour(10).minute(0),
    },
    {
      id: 2,
      title: "Project Update",
      start: dayjs().add(1, "day").hour(14).minute(0),
      end: dayjs().add(1, "day").hour(15).minute(0),
    },
  ];

  return (
    <div className="p-2 flex flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col gap-2">
        <BigCalendar events={events} />
      </div>
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
