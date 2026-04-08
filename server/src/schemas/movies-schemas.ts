import { z } from "zod";

export const getMoviesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
});

export type GetMoviesQuery = z.infer<typeof getMoviesQuerySchema>;

export const createMovieBodySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  release_date: z.coerce.date().optional(),
  rating: z.number().min(0).max(10).optional(),
});

export type CreateMovieBody = z.infer<typeof createMovieBodySchema>;
