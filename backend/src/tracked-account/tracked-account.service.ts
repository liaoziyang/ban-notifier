import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackedAccountRepository } from './tracked-account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import TrackedAccount from './trackedAccount.entity';
import { DeleteResult } from 'typeorm';
import { CreateTrackedAccountDto } from './dto/create-tracked-account.dto';

@Injectable()
export class TrackedAccountService {
    constructor(
        @InjectRepository(TrackedAccountRepository)
        private trackedAccountRepository: TrackedAccountRepository) { }

    async getTrackedAccountById(id: number): Promise<TrackedAccount> {
        const found = await this.trackedAccountRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`TrackedAccount with ID "${id}" not found`);
        }

        return found;
    }

    async createTrackedAccount(createTrackedAccountDto: CreateTrackedAccountDto): Promise<TrackedAccount> {
        const { steamId } = createTrackedAccountDto;
        const trackedAccount = new TrackedAccount();
        trackedAccount.steamId = steamId;
        await trackedAccount.save();
        return trackedAccount;
    }

    async deleteTrackedAccount(id: number): Promise<DeleteResult> {
        const deleted = await this.trackedAccountRepository.delete(id);
        return deleted;
    }
}
