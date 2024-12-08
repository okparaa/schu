import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { ExamsRepository } from "../repository/exams.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class ExamsService {
  private repo;
  constructor(repository: ExamsRepository) {
    this.repo = repository;
  }

  async getExams(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getExams(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
