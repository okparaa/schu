import { results } from "@/app/api/server/db/tables";
import { ResultsRepository } from "@/app/api/server/repository/results.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { ResultsService } from "@/app/api/server/services/results.service";
import { NextRequest, NextResponse } from "next/server";

const resultsService = new ResultsService(new ResultsRepository(results));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await resultsService.getResults(params);
  return NextResponse.json(response);
}
