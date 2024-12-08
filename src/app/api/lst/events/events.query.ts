import { createQStr } from "@/lib/createQStr";
import { EventList } from "@/types/EventList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useEvents() {
  const params = useSearchParams();
  return useSWR<{ records: EventList[]; total: { count: number } }>(
    `/api/lst/events?${createQStr(params)}`
  );
}
