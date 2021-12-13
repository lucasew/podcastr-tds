import {MigrationInterface, QueryRunner} from "typeorm";

export class feedIsUnique1639403026880 implements MigrationInterface {
    name = 'feedIsUnique1639403026880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "feed" varchar NOT NULL, "homepage" varchar NOT NULL, "title" varchar NOT NULL, "icon" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_podcast"("id", "feed", "homepage", "title", "icon") SELECT "id", "feed", "homepage", "title", "icon" FROM "podcast"`);
        await queryRunner.query(`DROP TABLE "podcast"`);
        await queryRunner.query(`ALTER TABLE "temporary_podcast" RENAME TO "podcast"`);
        await queryRunner.query(`CREATE TABLE "temporary_podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "feed" varchar NOT NULL, "homepage" varchar NOT NULL, "title" varchar NOT NULL, "icon" varchar NOT NULL, CONSTRAINT "UQ_5548407458fc61a80dcb90a9ced" UNIQUE ("feed"))`);
        await queryRunner.query(`INSERT INTO "temporary_podcast"("id", "feed", "homepage", "title", "icon") SELECT "id", "feed", "homepage", "title", "icon" FROM "podcast"`);
        await queryRunner.query(`DROP TABLE "podcast"`);
        await queryRunner.query(`ALTER TABLE "temporary_podcast" RENAME TO "podcast"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "podcast" RENAME TO "temporary_podcast"`);
        await queryRunner.query(`CREATE TABLE "podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "feed" varchar NOT NULL, "homepage" varchar NOT NULL, "title" varchar NOT NULL, "icon" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "podcast"("id", "feed", "homepage", "title", "icon") SELECT "id", "feed", "homepage", "title", "icon" FROM "temporary_podcast"`);
        await queryRunner.query(`DROP TABLE "temporary_podcast"`);
        await queryRunner.query(`ALTER TABLE "podcast" RENAME TO "temporary_podcast"`);
        await queryRunner.query(`CREATE TABLE "podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "feed" varchar NOT NULL, "homepage" varchar NOT NULL, "title" varchar NOT NULL, "icon" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "podcast"("id", "feed", "homepage", "title", "icon") SELECT "id", "feed", "homepage", "title", "icon" FROM "temporary_podcast"`);
        await queryRunner.query(`DROP TABLE "temporary_podcast"`);
    }

}
