import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./app-data-source";
import { serverPort } from "./config";
import { usersRouter } from "./routes/users-router";
import { authRouter } from "./routes/auth-router";
import { moviesRouter } from "./routes/movies-router";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/movies", moviesRouter);

app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
