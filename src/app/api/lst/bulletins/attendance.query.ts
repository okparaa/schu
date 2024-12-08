import { createQStr } from "@/lib/createQStr";
import { AttendanceList } from "@/types/AttendanceList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useAttendance() {
  const params = useSearchParams();
  return useSWR<{ records: AttendanceList[]; total: { count: number } }>(
    `/api/lst/attendance?${createQStr(params)}`
  );
}
