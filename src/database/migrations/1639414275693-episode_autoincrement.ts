import {MigrationInterface, QueryRunner} from "typeorm";

export class episodeAutoincrement1639414275693 implements MigrationInterface {
    name = 'episodeAutoincrement1639414275693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "listened"`);
        await queryRunner.query(`DROP TABLE "listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_listened" RENAME TO "listened"`);
        await queryRunner.query(`CREATE TABLE "temporary_episode" ("guid" varchar NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, CONSTRAINT "UQ_b032ed13f21c3bcfc6241bb25bc" UNIQUE ("guid"), CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_episode"("guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url") SELECT "guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url" FROM "episode"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`ALTER TABLE "temporary_episode" RENAME TO "episode"`);
        await queryRunner.query(`CREATE TABLE "temporary_listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer, CONSTRAINT "FK_645718cf6977131aed9ebc5a85d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dfe3788ed48c7070864eb7ad9b3" FOREIGN KEY ("episodeId") REFERENCES "episode" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "listened"`);
        await queryRunner.query(`DROP TABLE "listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_listened" RENAME TO "listened"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listened" RENAME TO "temporary_listened"`);
        await queryRunner.query(`CREATE TABLE "listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer)`);
        await queryRunner.query(`INSERT INTO "listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "temporary_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_listened"`);
        await queryRunner.query(`ALTER TABLE "episode" RENAME TO "temporary_episode"`);
        await queryRunner.query(`CREATE TABLE "episode" ("guid" varchar NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL, "id" integer PRIMARY KEY NOT NULL, "url" varchar NOT NULL, CONSTRAINT "UQ_b032ed13f21c3bcfc6241bb25bc" UNIQUE ("guid"), CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "episode"("guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url") SELECT "guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url" FROM "temporary_episode"`);
        await queryRunner.query(`DROP TABLE "temporary_episode"`);
        await queryRunner.query(`ALTER TABLE "listened" RENAME TO "temporary_listened"`);
        await queryRunner.query(`CREATE TABLE "listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer, CONSTRAINT "FK_dfe3788ed48c7070864eb7ad9b3" FOREIGN KEY ("episodeId") REFERENCES "episode" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "temporary_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_listened"`);
    }

}
