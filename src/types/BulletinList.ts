import { Bulletins, Classes } from "@/server/db/tables";

export type BulletinList = Bulletins & { class: Classes };
