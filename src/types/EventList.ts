import { Classes, Events, Students, Users } from "@/app/api/server/db/tables";

export type EventList = Events & {
  class: Classes & { students: Students & { user: Users }[] };
};
