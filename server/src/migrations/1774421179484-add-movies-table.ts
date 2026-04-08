import { ForeignKey, MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddMoviesTable1774421179484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movie",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "title", type: "varchar" },
          { name: "description", type: "text" },
          { name: "release_date", type: "date" },
          { name: "rating", type: "decimal" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "user_id", type: "bigint" },
        ],
        foreignKeys: [
          {
            name: "fk_movie_users",
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("movie", "fk_movie_users");

    await queryRunner.dropTable("movie");
  }
}
