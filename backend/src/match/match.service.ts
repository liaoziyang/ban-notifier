import { Injectable, Logger, NotImplementedException, UsePipes, Param } from '@nestjs/common';
import { Processor, Process } from 'nest-bull';
import { Queue, Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';
import { MatchType } from './match.type.interface';
import { QueueService } from '../queue/queue.service';
import { CsgoMatchDto } from './dto/csgoMatch.dto';
import { FaceItMatchPipe } from './pipes/faceitMatch.pipe';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TrackedAccountService } from '../tracked-account/tracked-account.service';
import TrackedAccount from '../tracked-account/trackedAccount.entity';
import Match from './match.entity';

@Injectable()
@Processor({ name: 'matches' })
export class MatchService {
  private logger = new Logger('MatchService');
  private matchesQueue: Queue;
  constructor(
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
    private queueService: QueueService,
    private userService: UserService,
    private trackedAccountService: TrackedAccountService,
  ) {
    this.matchesQueue = queueService.getQueue('matches');
  }

  public async addMatchToQueue(type: MatchType, data) {
    this.logger.debug(`addMatchToQueue() - Handling a new match of type ${type}`);
    data.type = type;

    if (data.type === MatchType.CSGOFaceIt && data.status !== 'finished') {
      this.logger.debug(`addMatchToQueue() - Match has not finished yet, wait to parse data until it is.`, JSON.stringify(data));
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

        this.handleFaceitMatch(data);
        break;

      default:
        break;
    }
  }

  private async handleFaceitMatch(match: CsgoMatchDto) {
    this.logger.debug(`handleFaceitMatch() - Handling FaceIt match - ${match.id}`);

    const usersInMatch: User[] = [];
    const trackedAccountsInMatch: TrackedAccount[] = [];

    // Find registered users in match

    for (const player of match.players) {
      const user = await this.userService.findUserBySteamOrFaceItId(player);
      if (user) {
        usersInMatch.push(user);
      }
    }

    this.logger.verbose(`handleFaceitMatch() - found ${usersInMatch.length} user(s) in match`);

    // Create TrackedAccount entities for each player in match

    for (const player of match.players) {
      const trackedAccount = await this.trackedAccountService.createTrackedAccount(player);
      trackedAccountsInMatch.push(trackedAccount);
    }

    // Link User and TrackedAccounts

    for (const trackedAccount of trackedAccountsInMatch) {
      trackedAccount.trackedBy = usersInMatch;
      trackedAccount.save();
    }

    // Create Match Entity

    const matchRecord = await this.createMatch(match);

    // Link Match & TrackedAccounts
    matchRecord.players = trackedAccountsInMatch;
    await matchRecord.save();
  }

  private handleMatchmakingMatch() {
    throw new NotImplementedException();
  }

  public async createMatch(data: CsgoMatchDto): Promise<Match> {
    const { externalId, type, date } = data;
    const match = new Match();

    match.date = date;
    match.externalId = externalId;
    match.type = type;

    try {
      await match.save();
      this.logger.verbose(`createMatch() - Added new match with external ID ${externalId}`);
      return match;
    } catch (error) {
      // error.code = 23505 means already exists
      // In this case, we will simply return the existing record
      if (error.code === '23505') {
        const foundMatch = await this.matchRepository.findOne({ externalId });
        return foundMatch;
      } else {
        throw error;
      }
    }
  }

}
