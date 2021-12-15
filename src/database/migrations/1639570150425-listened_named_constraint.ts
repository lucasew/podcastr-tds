import {MigrationInterface, QueryRunner} from "typeorm";

export class listenedNamedConstraint1639570150425 implements MigrationInterface {
    name = 'listenedNamedConstraint1639570150425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer, CONSTRAINT "FK_645718cf6977131aed9ebc5a85d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dfe3788ed48c7070864eb7ad9b3" FOREIGN KEY ("episodeId") REFERENCES "episode" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "listened"`);
        await queryRunner.query(`DROP TABLE "listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_listened" RENAME TO "listened"`);
        await queryRunner.query(`CREATE TABLE "temporary_listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer, CONSTRAINT "user_episode" UNIQUE ("userId", "episodeId"), CONSTRAINT "FK_645718cf6977131aed9ebc5a85d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dfe3788ed48c7070864eb7ad9b3" FOREIGN KEY ("episodeId") REFERENCES "episode" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "listened"`);
        await queryRunner.query(`DROP TABLE "listened"`);
        await queryRunner.query(`ALTER TABLE "temporary_listened" RENAME TO "listened"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listened" RENAME TO "temporary_listened"`);
        await queryRunner.query(`CREATE TABLE "listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer, CONSTRAINT "FK_645718cf6977131aed9ebc5a85d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dfe3788ed48c7070864eb7ad9b3" FOREIGN KEY ("episodeId") REFERENCES "episode" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "temporary_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_listened"`);
        await queryRunner.query(`ALTER TABLE "listened" RENAME TO "temporary_listened"`);
        await queryRunner.query(`CREATE TABLE "listened" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "position" integer NOT NULL, "isListened" boolean NOT NULL, "lastActivity" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "episodeId" integer, CONSTRAINT "UQ_97b4dad88209a65957e7ae2ddf0" UNIQUE ("userId", "episodeId"), CONSTRAINT "FK_645718cf6977131aed9ebc5a85d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dfe3788ed48c7070864eb7ad9b3" FOREIGN KEY ("episodeId") REFERENCES "episode" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "listened"("id", "position", "isListened", "lastActivity", "userId", "episodeId") SELECT "id", "position", "isListened", "lastActivity", "userId", "episodeId" FROM "temporary_listened"`);
        await queryRunner.query(`DROP TABLE "temporary_listened"`);
    }

}
