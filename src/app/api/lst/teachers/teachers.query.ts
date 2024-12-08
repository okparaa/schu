import { createQStr } from "@/lib/createQStr";
import { TeacherList } from "@/types/TeacherList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useTeachers() {
  const params = useSearchParams();
  return useSWR<{ records: TeacherList[]; total: { count: number } }>(
    `/api/lst/teachers?${createQStr(params)}`
  );
}
