import { Injectable, Logger, NotImplementedException, UsePipes, Param } from '@nestjs/common';
import { Processor, Process } from 'nest-bull';
import { Queue, Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';
import { MatchType } from './match.type.interface';
import { QueueService } from '../queue/queue.service';
import { CsgoMatchDto } from './dto/csgoMatch.dto';
import { FaceItMatchPipe } from './pipes/faceitMatch.pipe';

@Injectable()
@Processor({ name: 'matches' })
export class MatchService {
  private logger = new Logger('MatchService');
  private matchesQueue: Queue;
  constructor(
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
    private queueService: QueueService,
  ) {
    this.matchesQueue = queueService.getQueue('matches');
  }

  public async addMatchToQueue(type: MatchType, data) {
    this.logger.debug(`Handling a new match of type ${type}`);
    data.type = type;

    if (data.type === MatchType.CSGOFaceIt && data.status !== "finished") {
      this.logger.debug(`Match has not finished yet, wait to parse data until it is.`, JSON.stringify(data));
      return;
    }

    await this.matchesQueue.add(data);
  }

  @Process({ name: '__default__' })
  async handleMatch(job: Job) {
    switch (job.data.type) {
      case MatchType.CSGOFaceIt:
        // TODO: Figure out how to properly call this with decorator
        const transformPipe = new FaceItMatchPipe();
        const data = transformPipe.transform(job.data);

        this.handleFaceitMatch(data)
        break;

      default:
        break;
    }
  }

  private handleFaceitMatch(match: CsgoMatchDto) {

    console.log(`Handling FaceIt match - ${JSON.stringify(match)}`)
  }

  private handleMatchmakingMatch() {
    throw new NotImplementedException();
  }


}
