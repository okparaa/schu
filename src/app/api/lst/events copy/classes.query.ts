import { createQStr } from "@/lib/createQStr";
import { ClassList } from "@/types/ClassList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useClasses() {
  const params = useSearchParams();
  return useSWR<{ records: ClassList[]; total: { count: number } }>(
    `/api/lst/classes?${createQStr(params)}`
  );
}
