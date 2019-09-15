import { Injectable, Logger, HttpService } from '@nestjs/common';
import { InjectQueue, Processor, Process, OnQueueEvent, BullQueueEvents } from 'nest-bull';
import { Queue, Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '../config/config.service';

@Processor({ name: 'faceit' })
@Injectable()
export class FaceitService {
    private logger = new Logger('FaceitService');
    private faceitApiKey: string;
    constructor(
        @InjectQueue('faceit')
        readonly queue: Queue,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private readonly httpService: HttpService,
        config: ConfigService
    ) {
        // Add repeated job for getting user matches
        queue.add({}, { repeat: { cron: '* * * * *' } })
        this.faceitApiKey = config.get('FACEIT_API')
    }

    @Process({ name: '__default__' })
    async getMatchesForUsers() {
        const users = await this.userRepository.getUsersWithFaceIt();
        this.logger.verbose(`Found ${users.length} faceit users to check for new matches`);
        for (const user of users) {
            const history = await this.getPlayerHistory(user.faceitId);

            this.logger.debug(`Found ${history.data.items.length} matches for user "${user.username}" with FaceIt ID "${user.faceitId}"`);
            return history.data.items;
        }
    }

    @OnQueueEvent(BullQueueEvents.COMPLETED)
    onCompleted(job: Job) {
        this.logger.verbose(
            `Completed job ${job.id} of type ${job.name}`,
        );
    }

    private async getPlayerHistory(id: string) {
        try {
            const response = await this.httpService.get('https://open.faceit.com/data/v4/players/' + id + '/history', {
                headers: this.getHeaders(),
                params: {
                    limit: 100,
                }
            }).toPromise();
            return response;
        } catch (error) {
            this.logger.error(`getPlayerHistory() - Error connecting to Faceit API`, error.stack);
            throw error;
        }
    }

    private getHeaders() {
        return { 'Authorization': `Bearer ${this.faceitApiKey}` }
    }

}
