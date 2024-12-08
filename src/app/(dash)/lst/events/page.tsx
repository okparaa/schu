"use client";
import useEvents from "@/app/api/lst/events/events.query";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import Loading from "@/app/loading";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { EventList } from "@/types/EventList";
import { useSearchParams } from "next/navigation";
import { EventRow } from "./listRow";

function EventsListPage() {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(useSearchParams())
  );
  const { data, isLoading } = useEvents();

  if (isLoading) return <Loading />;
  const columns = [
    {
      header: "Title",
      accessor: "title",
      className: "pl-4 md:w-2/6 w-3/6",
    },
    {
      header: "Class",
      accessor: "class",
      className: "w-12",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "text-center lg:table-cell",
    },
  ];
  return (
    <div className="flex-1 bg-white p-4 rounded-md m-1">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg hidden md:block">All Events</h1>
        <div className="flex items-center w-full md:w-auto gap-4 px-5">
          <TableSearch />
          <div className="flex items-center gap-2 self-end">
            <span className="icon-params i-btn"></span>
            <span className="icon-sort-alt-down i-btn"></span>
            {role == "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        renderRow={EventRow}
        data={data?.records as EventList[]}
      />
      {/* {renderRow} */}
      <Pagination page={params.pg} total={data?.total.count as number} />
    </div>
  );
}

export default EventsListPage;
