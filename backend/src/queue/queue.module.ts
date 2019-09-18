import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule, BullModuleOptions } from 'nest-bull';
import * as dotenv from 'dotenv';
dotenv.config();

const redisOptions: BullModuleOptions = {
  options: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    }
  }
}

@Module({
  imports: [
    BullModule.register([{
      name: 'faceit',
      ...redisOptions
    }, {
      name: 'matches',
      ...redisOptions
    }]),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule { }
