import { assignments } from "@/app/api/server/db/tables";
import { AssignmentsRepository } from "@/app/api/server/repository/assignments.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { AssignmentsService } from "@/app/api/server/services/assignments.service";
import { NextRequest, NextResponse } from "next/server";

const assignmentsService = new AssignmentsService(
  new AssignmentsRepository(assignments)
);
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await assignmentsService.getAssignments(params);
  return NextResponse.json(response);
}
