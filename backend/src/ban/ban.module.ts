import { Module } from '@nestjs/common';
import { BanController } from './ban.controller';

@Module({
    providers: [],
    controllers: [BanController],
})
export class BanModule { }
