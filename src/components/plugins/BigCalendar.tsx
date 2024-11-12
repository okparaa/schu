"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(advancedFormat);

type Event = {
  allDay: boolean;
  title: string;
  start: Date;
  end: Date;
};

type BigCalendarProps = {
  events: Event[];
  title: string;
};

const BigCalendar: React.FC<BigCalendarProps> = ({ events, title }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<"weekly" | "daily">("weekly");

  // Generate only weekdays for the weekly view
  const daysOfWeek =
    view === "weekly"
      ? Array.from({ length: 5 }, (_, i) => currentDate.weekday(i + 1)) // Weekdays: Monday (1) to Friday (5)
      : [currentDate];

  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  // Navigate between weeks or days based on the view
  const handlePrev = () => {
    setCurrentDate((prev) =>
      view === "weekly" ? prev.subtract(1, "week") : prev.subtract(1, "day")
    );
  };

  const handleNext = () => {
    setCurrentDate((prev) =>
      view === "weekly" ? prev.add(1, "week") : prev.add(1, "day")
    );
  };

  // Filter events for each day and time slot
  const getEventsForTimeSlot = (day: dayjs.Dayjs, hour: number) => {
    return events.filter((event) => {
      const start = dayjs(event.start);
      const end = dayjs(event.end);
      return (
        (start.isSame(day, "day") &&
          start.hour() <= hour &&
          end.hour() > hour) ||
        (start.isSame(day, "day") &&
          start.hour() === hour &&
          start.minute() <= 0 &&
          end.minute() > 0)
      );
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg">
      {/* View Selector */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex w-1/6 justify-between items-center">
          <button
            onClick={handlePrev}
            className="text-gray-50 hover:text-blue-200 h-8 w-8 rounded-full icon-left-open hover:outline bg-blue-500"
          ></button>
          <button
            onClick={handleNext}
            className="text-gray-50 hover:text-blue-200 h-8 w-8 rounded-full icon-right-open hover:outline bg-blue-500"
          ></button>
        </div>
        <div className="text-center font-semibold text-xl">{title}</div>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as "weekly" | "daily")}
          className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700"
        >
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-6 border-b border-gray-200 text-center text-gray-700 font-semibold">
        <div className="p-2">Time</div>
        {daysOfWeek.map((day) => (
          <div
            key={day.toString()}
            className={`p-2 flex flex-col text-xs ${
              day.isToday() ? "text-blue-600" : ""
            }`}
          >
            <span>{day.format("ddd")}</span>
            <span>{day.format("MMM D")}</span>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-6 text-sm">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Time Slot Labels */}
            <div className="p-2 border-b border-gray-200 text-center text-gray-500 col-span-1">
              {dayjs().hour(hour).format("h A")}
            </div>

            {/* Day Columns */}
            {daysOfWeek.map((day) => (
              <div
                key={day.toString() + hour}
                className={`relative border-b border-gray-200 h-[60px] ${
                  view === "weekly" ? "" : "col-span-7"
                }`}
              >
                {/* Events in the Time Slot */}
                {getEventsForTimeSlot(day, hour).map((event, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 p-1 bg-blue-100 rounded-md text-xs text-stone-800 line-clamp-2 m-2"
                  >
                    <span className="flex justify-center items-center h-full">
                      {event.title}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BigCalendar;
