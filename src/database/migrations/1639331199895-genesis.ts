import {MigrationInterface, QueryRunner} from "typeorm";

export class genesis1639331199895 implements MigrationInterface {
    name = 'genesis1639331199895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "feed" varchar NOT NULL, "homepage" varchar NOT NULL, "title" varchar NOT NULL, "icon" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeGuid" varchar)`);
        await queryRunner.query(`CREATE TABLE "episode" ("guid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fbdba4e2ac694cf8c9cecf4dc8" ON "subscriptions" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a99b907fb5b7b2b9db87a43670" ON "subscriptions" ("podcastId") `);
        await queryRunner.query(`CREATE TABLE "temporary_listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeGuid" varchar, CONSTRAINT "FK_645718cf6977131aed9ebc5a85d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e8094a997e1e1ec92e3ab72e119" FOREIGN KEY ("episodeGuid") REFERENCES "episode" ("guid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_listened"("id", "position", "isListened", "lastActivity", "userId", "episodeGuid") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeGuid" FROM "listened"`);
        await queryRunner.query(`DROP TABLE "listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_listened" RENAME TO "listened"`);
        await queryRunner.query(`CREATE TABLE "temporary_episode" ("guid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_episode"("guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId") SELECT "guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId" FROM "episode"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`ALTER TABLE "temporary_episode" RENAME TO "episode"`);
        await queryRunner.query(`DROP INDEX "IDX_fbdba4e2ac694cf8c9cecf4dc8"`);
        await queryRunner.query(`DROP INDEX "IDX_a99b907fb5b7b2b9db87a43670"`);
        await queryRunner.query(`CREATE TABLE "temporary_subscriptions" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_a99b907fb5b7b2b9db87a436709" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "temporary_subscriptions"("userId", "podcastId") SELECT "userId", "podcastId" FROM "subscriptions"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`ALTER TABLE "temporary_subscriptions" RENAME TO "subscriptions"`);
        await queryRunner.query(`CREATE INDEX "IDX_fbdba4e2ac694cf8c9cecf4dc8" ON "subscriptions" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a99b907fb5b7b2b9db87a43670" ON "subscriptions" ("podcastId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a99b907fb5b7b2b9db87a43670"`);
        await queryRunner.query(`DROP INDEX "IDX_fbdba4e2ac694cf8c9cecf4dc8"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME TO "temporary_subscriptions"`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "subscriptions"("userId", "podcastId") SELECT "userId", "podcastId" FROM "temporary_subscriptions"`);
        await queryRunner.query(`DROP TABLE "temporary_subscriptions"`);
        await queryRunner.query(`CREATE INDEX "IDX_a99b907fb5b7b2b9db87a43670" ON "subscriptions" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fbdba4e2ac694cf8c9cecf4dc8" ON "subscriptions" ("userId") `);
        await queryRunner.query(`ALTER TABLE "episode" RENAME TO "temporary_episode"`);
        await queryRunner.query(`CREATE TABLE "episode" ("guid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "episode"("guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId") SELECT "guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId" FROM "temporary_episode"`);
        await queryRunner.query(`DROP TABLE "temporary_episode"`);
        await queryRunner.query(`ALTER TABLE "listened" RENAME TO "temporary_listened"`);
        await queryRunner.query(`CREATE TABLE "listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeGuid" varchar)`);
        await queryRunner.query(`INSERT INTO "listened"("id", "position", "isListened", "lastActivity", "userId", "episodeGuid") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeGuid" FROM "temporary_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_listened"`);
        await queryRunner.query(`DROP INDEX "IDX_a99b907fb5b7b2b9db87a43670"`);
        await queryRunner.query(`DROP INDEX "IDX_fbdba4e2ac694cf8c9cecf4dc8"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`DROP TABLE "listened"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "podcast"`);
    }

}
