import { Module } from '@nestjs/common';
import { BullModule } from 'nest-bull';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';
import { QueueModule } from '../queue/queue.module';
import { UserModule } from '../user/user.module';
import { TrackedAccountModule } from '../tracked-account/tracked-account.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchRepository]),
        QueueModule,
        UserModule,
        TrackedAccountModule,
    ],
    providers: [MatchService],
    exports: [MatchService],
})
export class MatchModule { }
