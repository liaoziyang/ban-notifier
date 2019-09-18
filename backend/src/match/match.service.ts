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

/**
 * Processor for the "matches" Queue
 */
@Injectable()
@Processor({ name: 'matches' })
export class MatchService {
  /**
   * It's the logger, duh :)
   */
  private logger = new Logger('MatchService');
  /**
   * A bull queue
   */
  private matchesQueue: Queue;
  /**
   * Inject the imported dependencies
   * @param matchRepository 
   * @param queueService 
   * @param userService 
   * @param trackedAccountService 
   */
  constructor(
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
    private queueService: QueueService,
    private userService: UserService,
    private trackedAccountService: TrackedAccountService,
  ) {
    this.matchesQueue = queueService.getQueue('matches');
  }

  /**
   * Called from other services that check for new matches. Adds the data to the queue to be processed.
   * @param type Type of the match (faceit, matchmaking, ...)
   * @param data 
   */
  public async addMatchToQueue(type: MatchType, data) {
    this.logger.debug(`addMatchToQueue() - Handling a new match of type ${type}`);
    data.type = type;

    if (data.type === MatchType.CSGOFaceIt && data.status !== 'finished') {
      this.logger.debug(`addMatchToQueue() - Match has not finished yet, wait to parse data until it is.`, JSON.stringify(data));
      return;
    }

    await this.matchesQueue.add(data);
  }

  /**
   * Processes matches gotten from other sources. (Currently only Faceit CSGO)
   * Transfroms the data gotten from the source into something useable by the system
   * @param job 
   */
  @Process({ name: '__default__' })
  async handleMatch(job: Job) {
    switch (job.data.type) {
      case MatchType.CSGOFaceIt:
        /**
         * Transform data from faceit API into usable data for the system
         * TODO: Figure out how to properly call this with decorator
         */
        const transformPipe = new FaceItMatchPipe();
        const data = transformPipe.transform(job.data);

        this.handleFaceitMatch(data);
        break;

      default:
        break;
    }
  }

  /**
   * Takes data from a Faceit CSGO match, parses it and stores it in the database.
   * @param match 
   */
  private async handleFaceitMatch(match: CsgoMatchDto) {
    this.logger.debug(`handleFaceitMatch() - Handling FaceIt match - ${match.id}`);

    /**
     * Array of registered users detected in this match
     * Used for linking DB records together
     */
    const usersInMatch: User[] = [];
    /**
     * Array of trackedAccounts in this match
     * Used for linking DB records together
     * This should equal the total amount of players in the game
     */
    const trackedAccountsInMatch: TrackedAccount[] = [];

    /**
     * Find registered users in match
     */

    for (const player of match.players) {
      const user = await this.userService.findUserBySteamOrFaceItId(player);
      if (user) {
        usersInMatch.push(user);
      }
    }

    this.logger.verbose(`handleFaceitMatch() - found ${usersInMatch.length} user(s) in match`);

    /**
     *  Create TrackedAccount entities for each player in match 
    */

    for (const player of match.players) {
      const trackedAccount = await this.trackedAccountService.createTrackedAccount(player);
      trackedAccountsInMatch.push(trackedAccount);
    }

    /**
     * Link User and TrackedAccounts
     */

    for (const trackedAccount of trackedAccountsInMatch) {
      trackedAccount.trackedBy = usersInMatch;
      trackedAccount.save();
    }

    /**
     * Create Match Entity
     */

    const matchRecord = await this.createMatch(match);

    /**
     * Link Match & TrackedAccounts
     */
    matchRecord.players = trackedAccountsInMatch;
    await matchRecord.save();
  }

/**
 * Takes data from a Matchmaking match and stores it in the database
 * @param match 
 */
  private handleMatchmakingMatch(match: CsgoMatchDto) {
    throw new NotImplementedException();
  }

  /**
   * Created a Match record in the database.
   * Note that the external ID has to be unique, otherwise the already existing record is returned
   * @param data 
   */
  public async createMatch(data: CsgoMatchDto): Promise<Match> {
    // Deconstruct for ease of use
    const { externalId, type, date } = data;
    // Create entity
    const match = new Match();
    // Assign data to the newly created entity
    match.date = date;
    match.externalId = externalId;
    match.type = type;

    try {
      // If this succeeds, the match is newly created.
      await match.save();
      this.logger.verbose(`createMatch() - Added new match with external ID ${externalId}`);
      return match;
    } catch (error) {
      /**
       * error.code = 23505 means already exists
       * In this case, we will simply return the existing record
       */
      if (error.code === '23505') {
        const foundMatch = await this.matchRepository.findOne({ externalId });
        return foundMatch;
      } else {
        throw error;
      }
    }
  }

}
