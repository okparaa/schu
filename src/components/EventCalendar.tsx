"use client";
import Calendar from "@/components/plugins/Calendar";

const EventCalendar = () => {
  const handleDateClick = (date: Date) => {
    console.log("Selected date:", date);
  };
  const events = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      time: "12:00 pm - 2:00 pm",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet.",
      time: "12:00 pm - 2:00 pm",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet.",
      time: "12:00 pm - 2:00 pm",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    <div className="flex justify-center items-center bg-gray-100 flex-col gap-2">
      <Calendar onDateClick={handleDateClick} />
      <div className="flex flex-col gap-3 bg-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold my-4">Events</h1>
          <span className="icon-dot-3"></span>
        </div>
        {events.map((item) => (
          <div
            className="border-stone-700 border-t p-1 rounded-md"
            key={item.id}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-sm text-gray-600">{item.title}</h1>
              <span className="text-gray-300 text-xs">{item.time}</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
