import {MigrationInterface, QueryRunner} from "typeorm";

export class addUqToMatchExternalID1568832290550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "UQ_8140defdc978b18aa6e3b8a2871" UNIQUE ("externalId")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "UQ_8140defdc978b18aa6e3b8a2871"`, undefined);
    }

}
