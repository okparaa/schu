import { students } from "@/app/api/server/db/tables";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { NextRequest, NextResponse } from "next/server";
import { SubjectsService } from "../../server/services/subjects.service";
import { SubjectsRepository } from "../../server/repository/subjects.repository";

const subjectsService = new SubjectsService(new SubjectsRepository(students));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await subjectsService.getSubjects(params);
  return NextResponse.json(response);
}
