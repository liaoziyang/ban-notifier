import { Module, HttpModule } from '@nestjs/common';
import { FaceitService } from './faceit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ConfigModule } from '../config/config.module';
import { MatchModule } from '../match/match.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule,
    ConfigModule,
    MatchModule,
  ],
  providers: [FaceitService],
})
export class FaceitModule { }
