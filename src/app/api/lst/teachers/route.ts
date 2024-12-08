import { teachers } from "@/app/api/server/db/tables";
import { TeachersRepository } from "@/app/api/server/repository/teachers.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { TeachersService } from "@/app/api/server/services/teachers.service";
import { NextRequest, NextResponse } from "next/server";

const teachersService = new TeachersService(new TeachersRepository(teachers));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await teachersService.getTeachers(params);
  return NextResponse.json(response);
}
