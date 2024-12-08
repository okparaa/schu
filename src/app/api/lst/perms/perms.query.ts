import { createQStr } from "@/lib/createQStr";
import { PermList } from "@/types/PermList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function usePerms() {
  const params = useSearchParams();
  return useSWR<{ records: PermList[]; total: { count: number } }>(
    `/api/lst/perms?${createQStr(params)}`
  );
}
