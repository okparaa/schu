import { createQStr } from "@/lib/createQStr";
import { ExamList } from "@/types/ExamList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useExams() {
  const params = useSearchParams();
  return useSWR<{ records: ExamList[]; total: { count: number } }>(
    `/api/lst/exams?${createQStr(params)}`
  );
}
