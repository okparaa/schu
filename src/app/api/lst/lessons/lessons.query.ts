import { createQStr } from "@/lib/createQStr";
import { LessonList } from "@/types/LessonList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useLessons() {
  const params = useSearchParams();
  return useSWR<{ records: LessonList[]; total: { count: number } }>(
    `/api/lst/lessons?${createQStr(params)}`
  );
}
