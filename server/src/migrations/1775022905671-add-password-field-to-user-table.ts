import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPasswordFieldToUserTable1775022905671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "password",
        type: "varchar",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "password");
  }
}
