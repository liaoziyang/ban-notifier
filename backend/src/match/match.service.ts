import { Injectable, Logger } from '@nestjs/common';
import { Processor } from 'nest-bull';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';
import { MatchType } from './match.type.interface';

@Injectable()
@Processor({ name: 'matches' })
export class MatchService {
  private logger = new Logger('MatchService');
    constructor(
        @InjectRepository(MatchRepository)
        private matchRepository: MatchRepository,
    ) {
     }

     public handleMatch(type: MatchType, data) {
      this.logger.debug(`Handling a new match of type ${type} with data: ${JSON.stringify(data)}`);
     }
}
