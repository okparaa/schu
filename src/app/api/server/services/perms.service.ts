import { PermsRepository } from "../repository/perms.repository";

import { ExpectationFailedException } from "../exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";

export class PermsService {
  private repo;
  constructor(repository: PermsRepository) {
    this.repo = repository;
  }

  async getPerms(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { pg, tk } = params;
      return await this.repo.getPerms(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
