import {MigrationInterface, QueryRunner} from "typeorm";

export class init1568824324352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "type" integer NOT NULL, "map" character varying NOT NULL, "externalId" character varying NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "steamId" text, "discordId" text, "faceitId" text, "faceitName" text, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tracked_account" ("id" SERIAL NOT NULL, "steamId" character varying NOT NULL, CONSTRAINT "UQ_6eb33372230de8c16a983271e86" UNIQUE ("steamId"), CONSTRAINT "PK_d86b80cf7794b635cdc22f5451d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "ban" ("id" SERIAL NOT NULL, "detectedAt" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "trackedAccountId" integer, CONSTRAINT "PK_071cddb7d5f18439fd992490618" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "match_players_tracked_account" ("matchId" integer NOT NULL, "trackedAccountId" integer NOT NULL, CONSTRAINT "PK_c45b9c3867b7a5ad24d4ff8aaac" PRIMARY KEY ("matchId", "trackedAccountId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f34150bbaec794b9747c071100" ON "match_players_tracked_account" ("matchId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_49a488f34ab352ccce23f4817c" ON "match_players_tracked_account" ("trackedAccountId") `, undefined);
        await queryRunner.query(`CREATE TABLE "tracked_account_tracked_by_user" ("trackedAccountId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_65543be45d924232b376a0b1b67" PRIMARY KEY ("trackedAccountId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9a85add7cedf9b1bbfafe57fd0" ON "tracked_account_tracked_by_user" ("trackedAccountId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9a38ec4315fc0f192ce93e4963" ON "tracked_account_tracked_by_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "ban" ADD CONSTRAINT "FK_5afebbd610cfe59e36bb590f147" FOREIGN KEY ("trackedAccountId") REFERENCES "tracked_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "match_players_tracked_account" ADD CONSTRAINT "FK_f34150bbaec794b9747c0711007" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "match_players_tracked_account" ADD CONSTRAINT "FK_49a488f34ab352ccce23f4817c9" FOREIGN KEY ("trackedAccountId") REFERENCES "tracked_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tracked_account_tracked_by_user" ADD CONSTRAINT "FK_9a85add7cedf9b1bbfafe57fd0e" FOREIGN KEY ("trackedAccountId") REFERENCES "tracked_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tracked_account_tracked_by_user" ADD CONSTRAINT "FK_9a38ec4315fc0f192ce93e49638" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tracked_account_tracked_by_user" DROP CONSTRAINT "FK_9a38ec4315fc0f192ce93e49638"`, undefined);
        await queryRunner.query(`ALTER TABLE "tracked_account_tracked_by_user" DROP CONSTRAINT "FK_9a85add7cedf9b1bbfafe57fd0e"`, undefined);
        await queryRunner.query(`ALTER TABLE "match_players_tracked_account" DROP CONSTRAINT "FK_49a488f34ab352ccce23f4817c9"`, undefined);
        await queryRunner.query(`ALTER TABLE "match_players_tracked_account" DROP CONSTRAINT "FK_f34150bbaec794b9747c0711007"`, undefined);
        await queryRunner.query(`ALTER TABLE "ban" DROP CONSTRAINT "FK_5afebbd610cfe59e36bb590f147"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9a38ec4315fc0f192ce93e4963"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9a85add7cedf9b1bbfafe57fd0"`, undefined);
        await queryRunner.query(`DROP TABLE "tracked_account_tracked_by_user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_49a488f34ab352ccce23f4817c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f34150bbaec794b9747c071100"`, undefined);
        await queryRunner.query(`DROP TABLE "match_players_tracked_account"`, undefined);
        await queryRunner.query(`DROP TABLE "ban"`, undefined);
        await queryRunner.query(`DROP TABLE "tracked_account"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "match"`, undefined);
    }

}
