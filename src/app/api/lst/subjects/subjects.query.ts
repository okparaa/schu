import { createQStr } from "@/lib/createQStr";
import { SubjectList } from "@/types/SubjectList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useSubjects() {
  const params = useSearchParams();
  return useSWR<{ records: SubjectList[]; total: { count: number } }>(
    `/api/lst/subjects?${createQStr(params)}`
  );
}
