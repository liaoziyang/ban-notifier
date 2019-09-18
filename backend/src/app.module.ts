import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { BanModule } from './ban/ban.module';
import { TrackedAccountModule } from './tracked-account/tracked-account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config/config.service';
import { FaceitModule } from './faceit/faceit.module';
import { MatchModule } from './match/match.module';
import { QueueModule } from './queue/queue.module';
import { UserModule } from './user/user.module';

// Does not happen in config service because it's a PITA to parse the values from the service inside module initialization
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10),
      username: process.env.PG_USER,
      password: process.env.PG_PW,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    BanModule,
    TrackedAccountModule,
    AuthModule,
    FaceitModule,
    MatchModule,
    QueueModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
