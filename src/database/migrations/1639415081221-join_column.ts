import {MigrationInterface, QueryRunner} from "typeorm";

export class joinColumn1639415081221 implements MigrationInterface {
    name = 'joinColumn1639415081221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_2d013d91ce5496549a8ce1c22df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_be76e7bc903ac00b203cdf83039" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_subscriptions_podcast"("userId", "podcastId") SELECT "userId", "podcastId" FROM "user_subscriptions_podcast"`);
        await queryRunner.query(`DROP TABLE "user_subscriptions_podcast"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_subscriptions_podcast" RENAME TO "user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`ALTER TABLE "user_subscriptions_podcast" RENAME TO "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE TABLE "user_subscriptions_podcast" ("userId" integer NOT NULL, "podcastId" integer NOT NULL, PRIMARY KEY ("userId", "podcastId"))`);
        await queryRunner.query(`INSERT INTO "user_subscriptions_podcast"("userId", "podcastId") SELECT "userId", "podcastId" FROM "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`DROP TABLE "temporary_user_subscriptions_podcast"`);
        await queryRunner.query(`CREATE INDEX "IDX_be76e7bc903ac00b203cdf8303" ON "user_subscriptions_podcast" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d013d91ce5496549a8ce1c22d" ON "user_subscriptions_podcast" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_be76e7bc903ac00b203cdf8303"`);
        await queryRunner.query(`DROP INDEX "IDX_2d013d91ce5496549a8ce1c22d"`);
        await queryRunner.query(`DROP TABLE "user_subscriptions_podcast"`);
    }

}
