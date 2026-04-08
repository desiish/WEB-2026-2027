import { ILike, Like } from "typeorm";
import { MovieEntity } from "../entities/movie-entity";
import { BaseRepository } from "./base-repository";

interface MoviesSearchParams {
  page: number;
  pageSize: number;
  search?: string;
}

class MovieRepository extends BaseRepository<MovieEntity> {
  constructor() {
    super(MovieEntity);
  }

  async findBySearchParams(params: MoviesSearchParams) {
    const { page, pageSize, search } = params;
    return this.find({
      skip: pageSize * (page - 1),
      take: pageSize,
      where: {
        ...(search ? { title: ILike(`%${search}%`) } : {}),
      },
    });
  }

  async createMovie(
    title: string,
    description: string,
    release_date: Date,
    rating: number,
    user_id: number,
  ) {
    const toSave = this.create({
      title,
      description,
      release_date,
      rating,
      user_id,
    });
    return this.save(toSave);
  }
}

const movieRepository = new MovieRepository();
export { movieRepository as MovieRepository };
