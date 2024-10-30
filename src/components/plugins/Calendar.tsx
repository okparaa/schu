"use client";

import React, { useState } from "react";
import dayjs from "dayjs";

type CalendarProps = {
  onDateClick?: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [activeDay, setActiveDay] = useState(0);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  const generateCalendarDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const startDayOfWeek = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    const daysArray = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const selectedDate = currentDate.date(day).toDate();
    setActiveDay(day);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onDateClick && onDateClick(selectedDate);
  };

  const daysArray = generateCalendarDays();

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrevMonth}
          className="text-gray-100 hover:text-blue-300 bg-blue-500 rounded-full icon-left-open p-[2px] px-[3px] hover:outline"
        />
        <h2 className="text-[16px] font-semibold text-gray-800">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-gray-100 hover:text-blue-300 bg-blue-500 rounded-full icon-right-open p-[2px] px-[3px] hover:outline"
        />
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-gray-700 mb-3">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-[14px]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 place-items-center">
        {daysArray.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`w-[28px] h-[28px] lg:w-8 lg:h-8 flex justify-center items-center rounded-full text-[14px] font-bold ${
              day
                ? "hover:bg-blue-500 hover:text-white cursor-pointer"
                : "cursor-default"
            } ${
              day === activeDay
                ? "bg-blue-500 text-white"
                : day
                ? "bg-blue-50"
                : ""
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
