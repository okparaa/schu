import { Bulletins, Classes } from "@/app/api/server/db/tables";

export type BulletinList = Bulletins & { class: Classes };
