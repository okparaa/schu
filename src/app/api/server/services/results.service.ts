import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { ResultsRepository } from "../repository/results.repository";

export class ResultsService {
  private repo;
  constructor(repository: ResultsRepository) {
    this.repo = repository;
  }

  async getResults(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getResults(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
