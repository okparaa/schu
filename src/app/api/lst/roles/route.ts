import { roles } from "@/app/api/server/db/tables";
import { RolesRepository } from "@/app/api/server/repository/roles.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { NextRequest, NextResponse } from "next/server";
import { RolesService } from "../../server/services/roles.service";

const rolesService = new RolesService(new RolesRepository(roles));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await rolesService.getRoles(params);

  return NextResponse.json(response);
}
