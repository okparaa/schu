import { perms } from "@/app/api/server/db/tables";
import { PermsRepository } from "@/app/api/server/repository/perms.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { PermsService } from "@/app/api/server/services/perms.service";
import { NextRequest, NextResponse } from "next/server";

const permsService = new PermsService(new PermsRepository(perms));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await permsService.getPerms(params);
  return NextResponse.json(response);
}
