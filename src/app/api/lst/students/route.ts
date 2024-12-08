import { students } from "@/app/api/server/db/tables";
import { StudentsRepository } from "@/app/api/server/repository/students.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { StudentsService } from "@/app/api/server/services/students.service";
import { NextRequest, NextResponse } from "next/server";

const studentsService = new StudentsService(new StudentsRepository(students));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await studentsService.getStudents(params);
  return NextResponse.json(response);
}
