import { parents } from "@/app/api/server/db/tables";
import { ParentsRepository } from "@/app/api/server/repository/parents.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { ParentsService } from "@/app/api/server/services/parents.service";
import { NextRequest, NextResponse } from "next/server";

const parentsService = new ParentsService(new ParentsRepository(parents));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await parentsService.getParents(params);
  return NextResponse.json(response);
}
