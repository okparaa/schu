import { Classes, Events, Students, Users } from "@/server/db/tables";

export type EventList = Events & {
  class: Classes & { students: Students & { user: Users }[] };
};
