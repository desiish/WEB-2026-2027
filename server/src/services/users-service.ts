import { UserRepository } from "../repositories/user-repository";

class UsersService {
  async getUsers(page: number, pageSize: number) {
    return UserRepository.find({ skip: pageSize * (page - 1), take: pageSize });
  }
}

const usersService = new UsersService();
export { usersService as UsersService };
