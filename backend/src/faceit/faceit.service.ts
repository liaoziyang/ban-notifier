import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Processor, Process, OnQueueStalled, OnQueueFailed, OnQueueError, OnQueueCompleted } from 'nest-bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '../config/config.service';
import { MatchService } from '../match/match.service';
import { MatchType } from '../match/match.type.interface';

@Injectable()
@Processor({ name: 'faceit' })
export class FaceitService {
    private logger = new Logger('FaceitService');
    private faceitApiKey: string;
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
        private matchService: MatchService,
    ) {
        this.faceitApiKey = config.get('FACEIT_API');
    }

    @Process({ name: '__default__' })
    async getMatchesForUsers(job: Job): Promise<void> {
        const users = await this.userRepository.getUsersWithFaceIt();
        this.logger.verbose(`Found ${users.length} faceit users to check for new matches`);
        for (const user of users) {
            const history = await this.getPlayerHistory(user.faceitId);

            this.logger.debug(`Found ${history.data.items.length} matches for user "${user.username}" with FaceIt ID "${user.faceitId}"`);
            for (const match of history.data.items) {
                this.matchService.addMatchToQueue(MatchType.CSGOFaceIt, match);
            }
        }
        return;
    }

    private async getPlayerHistory(id: string) {
        try {
            const response = await this.httpService.get('https://open.faceit.com/data/v4/players/' + id + '/history', {
                headers: this.getHeaders(),
                params: {
                    limit: 100,
                },
            }).toPromise();
            return response;
        } catch (error) {
            this.logger.error(`getPlayerHistory() - Error connecting to Faceit API`, error.stack);
            throw error;
        }
    }

    private getHeaders() {
        return { Authorization: `Bearer ${this.faceitApiKey}` };
    }

    @OnQueueCompleted()
    onCompleted(job: Job) {
        this.logger.verbose(
            `Completed job ${job.id} of type ${job.name} from queue ${job.queue.name}`,
        );
    }

    @OnQueueStalled()
    onStalled(job: Job) {
        this.logger.warn(`Job ${job.id} of type ${job.name} from queue ${job.queue.name} was stalled!`);
    }

    @OnQueueFailed()
    onFailed(job: Job) {
        this.logger.error(`Job ${job.id} of type ${job.name} from queue ${job.queue.name} has failed!`);
    }

    @OnQueueError()
    onError(error) {
        this.logger.error(`An error occured in a queue!`, error.stack);
    }

}
