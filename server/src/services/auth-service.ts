import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user-repository";
import { JwtService } from "./jwt-service";

class AuthService {
  async register(name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return UserRepository.createUser(name, hashedPassword);
  }

  async login(name: string, password: string) {
    const user = await UserRepository.findByNameWithPassword(name);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = JwtService.sign({ id: user.id, name: user.name });
    return { token, user: { id: user.id, name: user.name } };
  }
}

const authService = new AuthService();
export { authService as AuthService };
