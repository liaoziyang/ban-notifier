import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectQueue, OnQueueEvent, BullQueueEvents, OnQueueStalled, OnQueueError, OnQueueFailed, Processor } from 'nest-bull';
import { Queue, Job } from 'bull';

@Injectable()
export class QueueService {
    private queues: Map<string, Queue> = new Map();
    private logger = new Logger('QueueService');
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

    public getQueue(key: string) {
        if (!this.queues.has(key)) {
            throw new NotFoundException();
        }

        return this.queues.get(key);
    }
}
