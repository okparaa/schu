import { Inject } from "../decorators/injector";
import { RolePermsRepository } from "../repository/role_perms.repository";
import { rolePerms } from "../db/tables";
import { NotFoundException } from "../exceptions/notFound.exception";

export class RolePermissionService {
  @Inject(RolePermsRepository, rolePerms)
  repo: RolePermsRepository;
  async getUserRolePermissions(userId: string) {
    const response = await this.repo.getUserRolePerms(userId);
    if (!response) {
      throw new NotFoundException("unable to retrieve permissions");
    }
    return response;
  }
}
