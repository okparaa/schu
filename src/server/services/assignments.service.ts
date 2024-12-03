import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { AssignmentsRepository } from "../repository/assignments.repository";

export class AssignmentsService {
  private repo;
  constructor(repository: AssignmentsRepository) {
    this.repo = repository;
  }

  async getAssignments(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getAssignments(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
