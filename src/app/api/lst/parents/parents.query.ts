import { createQStr } from "@/lib/createQStr";
import { ParentList } from "@/types/ParentList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useParents() {
  const params = useSearchParams();
  return useSWR<{ records: ParentList[]; total: { count: number } }>(
    `/api/lst/parents?${createQStr(params)}`
  );
}
