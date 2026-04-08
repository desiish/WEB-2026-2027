import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieEntity } from "./movie-entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("increment", { name: "id", type: "bigint" })
  id!: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name!: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password!: string;

  @OneToMany(() => MovieEntity, (movie) => movie.user)
  movies?: MovieEntity[];
}
