import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from 'nest-bull';

@Module({
  imports: [
    BullModule.register([{
      name: 'faceit',
    }, {
      name: 'matches',
    }]),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
