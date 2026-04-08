import z from "zod";
import { MovieEntity } from "../entities/movie-entity";

export const MovieSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const MovieWithoutDescriptionSchema = MovieSchema.omit({
  description: true,
});

export const MovieWithRatingSchema = MovieSchema.extend({
  rating: z.coerce.number(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type MovieWithoutDescription = z.infer<
  typeof MovieWithoutDescriptionSchema
>;

export type MovieWithRating = z.infer<typeof MovieWithRatingSchema>;

class MoviesSerializer {
  serialize(movie: MovieEntity): Movie {
    return {
      title: movie.title,
      description: movie.description,
    };
  }

  serializeMultiple(movies: MovieEntity[]): Movie[] {
    return movies.map(this.serialize);
  }
}

const moviesSerializer = new MoviesSerializer();
export { moviesSerializer as MoviesSerializer };
