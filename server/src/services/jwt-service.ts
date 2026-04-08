import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

export interface JwtPayload {
  id: number;
  name: string | null;
}

class JwtService {
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, jwtSecret) as JwtPayload;
  }
}

const jwtService = new JwtService();
export { jwtService as JwtService };
