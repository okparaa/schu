import { createQStr } from "@/lib/createQStr";
import { AssignmentList } from "@/types/AssignmentList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useAssignments() {
  const params = useSearchParams();
  return useSWR<{ records: AssignmentList[]; total: { count: number } }>(
    `/api/lst/assignments?${createQStr(params)}`
  );
}
