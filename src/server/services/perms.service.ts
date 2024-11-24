import { sql } from "drizzle-orm";
import { Perms, perms } from "../db/tables";
import * as z from "zod";
import { Inject } from "../decorators/injector";
import { PermsRepository } from "../repository/perms.repository";

import { PermsSchema } from "../schemas/perms.schema";
import { NotCreatedException } from "../exceptions/notCreated.exception";
import { NotUpdatedException } from "../exceptions/notUpdated.exception";

export class RoutesService {
  @Inject(PermsRepository, perms) repo!: PermsRepository;
  async createRoute(data: z.infer<typeof PermsSchema>) {
    const route = (await this.repo.create(data)) as Perms;
    if (!route.id) {
      throw new NotCreatedException("could not create route");
    }
    return route;
  }
  async getPerms(limit: number, offset: number) {
    return await this.repo.find(limit, offset);
  }
  async getPerm(id: string) {
    return await this.repo.findOne(id);
  }
  async updatePerm(data: z.infer<typeof PermsSchema>) {
    const route = (await this.repo.update(data)) as Perms;
    if (!route.id) {
      throw new NotUpdatedException("could not update route");
    }
    return route;
  }

  async noPermPair(name: string) {
    const result = await this.repo.db.execute(
      sql`SELECT * FROM ${this.repo.table} WHERE route = ${name}`
    );

    return result.rowCount == 0 ? true : false;
  }
  async noSlugPair(name: string) {
    const result = await this.repo.db.execute(
      sql`SELECT * FROM ${this.repo.table} WHERE slug = ${name}`
    );

    return result.rowCount == 0 ? true : false;
  }
}
