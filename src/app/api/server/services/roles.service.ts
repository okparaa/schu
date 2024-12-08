import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { RolesRepository } from "../repository/roles.repository";

export class RolesService {
  private repo;
  constructor(repository: RolesRepository) {
    this.repo = repository;
  }

  async getRoles(params: RequestQueryType) {
    // Basic validation for limit and offset

    try {
      const { tk, pg } = params;
      return await this.repo.getRoles(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
