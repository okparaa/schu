import { exams } from "@/app/api/server/db/tables";
import { ExamsRepository } from "@/app/api/server/repository/exams.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { NextRequest, NextResponse } from "next/server";
import { ExamsService } from "../../server/services/exams.service";

const examsService = new ExamsService(new ExamsRepository(exams));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await examsService.getExams(params);
  return NextResponse.json(response);
}
