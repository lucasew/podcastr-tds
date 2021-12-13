import {MigrationInterface, QueryRunner} from "typeorm";

export class episodeIcon1639416447609 implements MigrationInterface {
    name = 'episodeIcon1639416447609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`CREATE TABLE "temporary_podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_af4fc5f7c04d3bc00d38ea21147" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_podcast_subscribers_user"("podcastId", "userId") SELECT "podcastId", "userId" FROM "podcast_subscribers_user"`);
        await queryRunner.query(`DROP TABLE "podcast_subscribers_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_podcast_subscribers_user" RENAME TO "podcast_subscribers_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, CONSTRAINT "FK_0d1d02a0b601721e70d10c9801c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_listened_listened"("userId", "listenedId") SELECT "userId", "listenedId" FROM "user_listened_listened"`);
        await queryRunner.query(`DROP TABLE "user_listened_listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_listened_listened" RENAME TO "user_listened_listened"`);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_2d013d91ce5496549a8ce1c22df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_subscriptions_podcast"("userId", "podcastId") SELECT "userId", "podcastId" FROM "user_subscriptions_podcast"`);
        await queryRunner.query(`DROP TABLE "user_subscriptions_podcast"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_subscriptions_podcast" RENAME TO "user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_episode" ("guid" varchar NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "icon" varchar, CONSTRAINT "UQ_b032ed13f21c3bcfc6241bb25bc" UNIQUE ("guid"), CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_episode"("guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url") SELECT "guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url" FROM "episode"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`ALTER TABLE "temporary_episode" RENAME TO "episode"`);
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`CREATE TABLE "temporary_podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_af4fc5f7c04d3bc00d38ea21147" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_4da433d7291fe3ba867d006ef70" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_podcast_subscribers_user"("podcastId", "userId") SELECT "podcastId", "userId" FROM "podcast_subscribers_user"`);
        await queryRunner.query(`DROP TABLE "podcast_subscribers_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_podcast_subscribers_user" RENAME TO "podcast_subscribers_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, CONSTRAINT "FK_0d1d02a0b601721e70d10c9801c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_cc80e81bd7b7fe5eb56b5751b6f" FOREIGN KEY ("listenedId") REFERENCES "listened" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_listened_listened"("userId", "listenedId") SELECT "userId", "listenedId" FROM "user_listened_listened"`);
        await queryRunner.query(`DROP TABLE "user_listened_listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_listened_listened" RENAME TO "user_listened_listened"`);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_2d013d91ce5496549a8ce1c22df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_be76e7bc903ac00b203cdf83039" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_subscriptions_podcast"("userId", "podcastId") SELECT "userId", "podcastId" FROM "user_subscriptions_podcast"`);
        await queryRunner.query(`DROP TABLE "user_subscriptions_podcast"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_subscriptions_podcast" RENAME TO "user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`ALTER TABLE "user_subscriptions_podcast" RENAME TO "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE TABLE "user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_2d013d91ce5496549a8ce1c22df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "user_subscriptions_podcast"("userId", "podcastId") SELECT "userId", "podcastId" FROM "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`DROP TABLE "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`ALTER TABLE "user_listened_listened" RENAME TO "temporary_user_listened_listened"`);
        await queryRunner.query(`CREATE TABLE "user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, CONSTRAINT "FK_0d1d02a0b601721e70d10c9801c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`INSERT INTO "user_listened_listened"("userId", "listenedId") SELECT "userId", "listenedId" FROM "temporary_user_listened_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_user_listened_listened"`);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`ALTER TABLE "podcast_subscribers_user" RENAME TO "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`CREATE TABLE "podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_af4fc5f7c04d3bc00d38ea21147" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`INSERT INTO "podcast_subscribers_user"("podcastId", "userId") SELECT "podcastId", "userId" FROM "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`DROP TABLE "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "episode" RENAME TO "temporary_episode"`);
        await queryRunner.query(`CREATE TABLE "episode" ("guid" varchar NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mp3url" varchar NOT NULL, "pubDate" datetime NOT NULL, "duration" integer NOT NULL, "podcastId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, CONSTRAINT "UQ_b032ed13f21c3bcfc6241bb25bc" UNIQUE ("guid"), CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "episode"("guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url") SELECT "guid", "title", "description", "mp3url", "pubDate", "duration", "podcastId", "id", "url" FROM "temporary_episode"`);
        await queryRunner.query(`DROP TABLE "temporary_episode"`);
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`ALTER TABLE "user_subscriptions_podcast" RENAME TO "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE TABLE "user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_be76e7bc903ac00b203cdf83039" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2d013d91ce5496549a8ce1c22df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "user_subscriptions_podcast"("userId", "podcastId") SELECT "userId", "podcastId" FROM "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`DROP TABLE "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
        await queryRunner.query(`DROP INDEX "IDX_0d1d02a0b601721e70d10c9801"`);
        await queryRunner.query(`DROP INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6"`);
        await queryRunner.query(`ALTER TABLE "user_listened_listened" RENAME TO "temporary_user_listened_listened"`);
        await queryRunner.query(`CREATE TABLE "user_listened_listened" ("userId" integer NOT NULL, "listenedId" integer NOT NULL, CONSTRAINT "FK_cc80e81bd7b7fe5eb56b5751b6f" FOREIGN KEY ("listenedId") REFERENCES "listened" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0d1d02a0b601721e70d10c9801c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "listenedId"))`);
        await queryRunner.query(`INSERT INTO "user_listened_listened"("userId", "listenedId") SELECT "userId", "listenedId" FROM "temporary_user_listened_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_user_listened_listened"`);
        await queryRunner.query(`CREATE INDEX "IDX_0d1d02a0b601721e70d10c9801" ON "user_listened_listened" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc80e81bd7b7fe5eb56b5751b6" ON "user_listened_listened" ("listenedId") `);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`ALTER TABLE "podcast_subscribers_user" RENAME TO "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`CREATE TABLE "podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_4da433d7291fe3ba867d006ef70" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_af4fc5f7c04d3bc00d38ea21147" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`INSERT INTO "podcast_subscribers_user"("podcastId", "userId") SELECT "podcastId", "userId" FROM "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`DROP TABLE "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
    }

}
