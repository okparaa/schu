import Announcements from "@/components/Bulletins";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-2 flex flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col gap-2">
        <div className="flex gap-4 justify-between flex-wrap bg-white p-4 rounded-lg">
          <UserCard type="Student" />
          <UserCard type="Staff" />
          <UserCard type="Parent" />
          <UserCard type="Admin" />
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-1/3">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3">
            <AttendanceChart />
          </div>
        </div>
        <div className="">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
        <div className="h-full w-full bg-white"></div>
      </div>
    </div>
  );
};

export default AdminPage;
