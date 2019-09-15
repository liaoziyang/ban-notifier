import { Module } from '@nestjs/common';
import { BullModule } from 'nest-bull';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchRepository]),
        BullModule.register({
            name: 'matches'
        })
    ],
    providers: [MatchService]
})
export class MatchModule { }
