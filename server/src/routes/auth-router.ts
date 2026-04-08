import { Router } from "express";
import { AuthService } from "../services/auth-service";
import { requestHandler } from "../middleware/request-handler";
import { registerBodySchema, loginBodySchema } from "../schemas/users-schemas";

export const authRouter = Router();

authRouter.post(
  "/register",
  requestHandler(async (req, res) => {
    const { name, password } = registerBodySchema.parse(req.body);
    const user = await AuthService.register(name, password);
    res.status(201).json(user);
  }),
);

authRouter.post(
  "/login",
  requestHandler(async (req, res) => {
    const { name, password } = loginBodySchema.parse(req.body);
    const result = await AuthService.login(name, password);
    res.status(200).json(result);
  }),
);
