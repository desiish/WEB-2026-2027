import { Router } from "express";
import { UsersService } from "../services/users-service";

export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const { page, pageSize } = req.query;
  const users = await UsersService.getUsers(Number(page), Number(pageSize));
  res.status(200).json({ users });
});
