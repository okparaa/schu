import { createQStr } from "@/lib/createQStr";
import { StudentList } from "@/types/StudentList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useStudents() {
  const params = useSearchParams();
  return useSWR<{ records: StudentList[]; total: { count: number } }>(
    `/api/lst/students?${createQStr(params)}`
  );
}
