import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import Match from './match.entity';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
    private logger = new Logger('MatchRepository');


}
