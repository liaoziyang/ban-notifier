import { Module } from '@nestjs/common';
import { BullModule } from 'nest-bull';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';
import { QueueModule } from '../queue/queue.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchRepository]),
        QueueModule,
    ],
    providers: [MatchService],
    exports: [MatchService],
})
export class MatchModule { }
