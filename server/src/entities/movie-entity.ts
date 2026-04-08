import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user-entity";

@Entity("movie")
export class MovieEntity {
  @PrimaryGeneratedColumn("increment", { name: "id", type: "bigint" })
  id!: number;

  @Column({ name: "title", type: "varchar" })
  title!: string;

  @Column({ name: "description", type: "text" })
  description!: string;

  @Column({ name: "release_date", type: "date" })
  release_date!: Date;

  @Column({ name: "rating", type: "decimal" })
  rating!: number;

  @Column({ name: "created_at", type: "timestamp", default: "now()" })
  created_at!: Date;

  @Column({ name: "updated_at", type: "timestamp", default: "now()" })
  updated_at!: Date;

  @Column({ name: "user_id", type: "bigint" })
  user_id!: number;

  @ManyToOne(() => UserEntity, (user) => user.movies)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
