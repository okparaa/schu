import { createQStr } from "@/lib/createQStr";
import { RoleList } from "@/types/RoleList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useRoles() {
  const params = useSearchParams();
  return useSWR<{ records: RoleList[]; total: { count: number } }>(
    `/api/lst/roles?${createQStr(params)}`
  );
}
