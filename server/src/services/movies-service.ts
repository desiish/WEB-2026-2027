import { NotFoundError } from "../errors/not-found-error";
import { MovieRepository } from "../repositories/movie-repository";

interface CreateMovieParams {
  title: string;
  description?: string;
  release_date?: Date;
  rating?: number;
  user_id: number;
}

class MoviesService {
  async getMovies(page: number, pageSize: number, search?: string) {
    const res = await MovieRepository.findBySearchParams({
      page,
      pageSize,
      search,
    });

    if (res.length === 0) {
      throw new NotFoundError("No movies found");
    }

    return res;
  }

  async createMovie(
    title: string,
    description: string | undefined,
    release_date: Date | undefined,
    rating: number | undefined,
    user_id: number,
  ) {
    return MovieRepository.save({
      title,
      description,
      release_date,
      rating,
      user_id,
    });
  }
}

const moviesService = new MoviesService();
export { moviesService as MoviesService };
