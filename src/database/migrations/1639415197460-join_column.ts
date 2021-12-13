import {MigrationInterface, QueryRunner} from "typeorm";

export class joinColumn1639415197460 implements MigrationInterface {
    name = 'joinColumn1639415197460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`CREATE TABLE "temporary_podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_af4fc5f7c04d3bc00d38ea21147" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_4da433d7291fe3ba867d006ef70" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_podcast_subscribers_user"("podcastId", "userId") SELECT "podcastId", "userId" FROM "podcast_subscribers_user"`);
        await queryRunner.query(`DROP TABLE "podcast_subscribers_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_podcast_subscribers_user" RENAME TO "podcast_subscribers_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`ALTER TABLE "podcast_subscribers_user" RENAME TO "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`CREATE TABLE "podcast_subscribers_user" ("podcastId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("podcastId", "userId"))`);
        await queryRunner.query(`INSERT INTO "podcast_subscribers_user"("podcastId", "userId") SELECT "podcastId", "userId" FROM "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`DROP TABLE "temporary_podcast_subscribers_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_4da433d7291fe3ba867d006ef7" ON "podcast_subscribers_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af4fc5f7c04d3bc00d38ea2114" ON "podcast_subscribers_user" ("podcastId") `);
        await queryRunner.query(`DROP INDEX "IDX_4da433d7291fe3ba867d006ef7"`);
        await queryRunner.query(`DROP INDEX "IDX_af4fc5f7c04d3bc00d38ea2114"`);
        await queryRunner.query(`DROP TABLE "podcast_subscribers_user"`);
    }

}
