import {MigrationInterface, QueryRunner} from "typeorm";

export class podcastDescription1639492001458 implements MigrationInterface {
    name = 'podcastDescription1639492001458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE podcast ADD description varchar`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "podcast" DROP column description`);
    }

}
