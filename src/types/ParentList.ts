import { Parents, Students, Users } from "@/server/db/tables";

export type ParentList = Parents & { user: Users; students: Students[] };
