import { UserEntity } from "../entities/user-entity";
import { BadRequestError } from "../errors/bad-request-error";
import { BaseRepository } from "./base-repository";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findByName(name: string) {
    return this.findOne({
      where: { name },
      relations: {
        movies: true,
      },
    });
  }

  async findByNameWithPassword(name: string) {
    return this.findOne({
      where: { name },
      select: ["id", "name", "password"],
    });
  }

  async findById(id: number) {
    return this.findOne({ where: { id } });
  }

  async createUser(name: string, password: string) {
    if (!name || !password) {
      throw new BadRequestError("Name and password are required");
    }
    const toSave = this.create({ name, password });
    return this.save(toSave);
  }
}

const userRepository = new UserRepository();
export { userRepository as UserRepository };
