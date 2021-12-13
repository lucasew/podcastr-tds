import {MigrationInterface, QueryRunner} from "typeorm";

export class joinColumn1639415323048 implements MigrationInterface {
    name = 'joinColumn1639415323048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, CONSTRAINT "FK_0d1d02a0b601721e70d10c9801c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_cc80e81bd7b7fe5eb56b5751b6f" FOREIGN KEY ("listenedId") REFERENCES "listened" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_listened_listened"("userId", "listenedId") SELECT "userId", "listenedId" FROM "user_listened_listened"`);
        await queryRunner.query(`DROP TABLE "user_listened_listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_listened_listened" RENAME TO "user_listened_listened"`);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`ALTER TABLE "user_listened_listened" RENAME TO "temporary_user_listened_listened"`);
        await queryRunner.query(`CREATE TABLE "user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`INSERT INTO "user_listened_listened"("userId", "listenedId") SELECT "userId", "listenedId" FROM "temporary_user_listened_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_user_listened_listened"`);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`DROP TABLE "user_listened_listened"`);
    }

}
