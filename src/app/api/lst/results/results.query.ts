import { createQStr } from "@/lib/createQStr";
import { ResultList } from "@/types/ResultList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useResults() {
  const params = useSearchParams();
  return useSWR<{ records: ResultList[]; total: { count: number } }>(
    `/api/lst/results?${createQStr(params)}`
  );
}
