import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { BulletinsRepository } from "../repository/bulletins.repository";

export class BulletinsService {
  private repo;
  constructor(repository: BulletinsRepository) {
    this.repo = repository;
  }

  async getBulletins(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getBulletins(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
