import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectQueue, OnQueueEvent, BullQueueEvents, OnQueueStalled, OnQueueError, OnQueueFailed, Processor } from 'nest-bull';
import { Queue } from 'bull';

/**
 * Handles Bull Queues
 */
@Injectable()
export class QueueService {
    /**
     * Map containing the queues
     */
    private queues: Map<string, Queue> = new Map();
    /**
     * The logger
     */
    private logger = new Logger('QueueService');
    /**
     * Inject dependencies
     * @param faceitQueue 
     * @param matchesQueue 
     */
    constructor(
        @InjectQueue('faceit')
        private readonly faceitQueue: Queue,
        @InjectQueue('matches')
        private readonly matchesQueue: Queue,
    ) {
        // Add repeated job for getting user matches
        faceitQueue.add({}, { repeat: { cron: '* * * * *' } });

        this.queues.set('faceit', faceitQueue);
        this.queues.set('matches', matchesQueue);
    }

    /**
     * Get a Queue instance
     * @param key 
     */
    public getQueue(key: string) {
        if (!this.queues.has(key)) {
            throw new NotFoundException();
        }

        return this.queues.get(key);
    }
}
