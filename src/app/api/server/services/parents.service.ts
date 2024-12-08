import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { ParentsRepository } from "../repository/parents.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class ParentsService {
  private repo;
  constructor(repository: ParentsRepository) {
    this.repo = repository;
  }

  async getParents(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { pg, tk } = params;
      return await this.repo.getParents(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
