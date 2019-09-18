import {MigrationInterface, QueryRunner} from "typeorm";

export class removeMapFromMatch1568832125115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "map"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "match" ADD "map" character varying NOT NULL`, undefined);
    }

}
