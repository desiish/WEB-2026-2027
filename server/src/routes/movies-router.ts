import { Router } from "express";
import { MoviesService } from "../services/movies-service";
import { requestHandler } from "../middleware/request-handler";
import {
  getMoviesQuerySchema,
  createMovieBodySchema,
} from "../schemas/movies-schemas";
import { authMiddleware } from "../middleware/auth-middleware";
import { MoviesSerializer } from "../serializers/movie-serializer";

export const moviesRouter = Router();

moviesRouter.get(
  "/",
  authMiddleware,
  requestHandler(async (req, res) => {
    const query = getMoviesQuerySchema.parse(req.query);
    const movies = await MoviesService.getMovies(
      query.page,
      query.pageSize,
      query.search,
    );
    res.status(200).json(MoviesSerializer.serializeMultiple(movies));
  }),
);

moviesRouter.post(
  "/",
  authMiddleware,
  requestHandler(async (req, res) => {
    const { title, description, release_date, rating } =
      createMovieBodySchema.parse(req.body);
    const userId = res.locals.user.id;
    const movie = await MoviesService.createMovie(
      title,
      description,
      release_date,
      rating,
      userId,
    );
    res.status(201).json(MoviesSerializer.serialize(movie));
  }),
);
