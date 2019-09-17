import { Injectable } from '@nestjs/common';
import { InjectQueue, Processor } from 'nest-bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';

@Injectable()
@Processor({ name: 'matches' })
export class MatchService {
    constructor(
        @InjectRepository(MatchRepository)
        private matchRepository: MatchRepository,
        @InjectQueue('matches')
        readonly matchesQueue: Queue
    ) {
     }
}
