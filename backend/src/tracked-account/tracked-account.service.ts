import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TrackedAccountRepository } from './tracked-account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import TrackedAccount from './trackedAccount.entity';
import { DeleteResult } from 'typeorm';
import { CreateTrackedAccountDto } from './dto/create-tracked-account.dto';

@Injectable()
export class TrackedAccountService {
    private logger = new Logger('TrackedAccountService');

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
        try {
            await trackedAccount.save();
            this.logger.verbose(`createTrackedAccount() - Added account with steam ID ${steamId}`);
            return trackedAccount;
        } catch (error) {
            // error.code = 23505 means trackedAccount already exists
            // In this case, we will simply return the existing record
            if (error.code === '23505') {
                const foundTrackedAccount = await this.trackedAccountRepository.findOne({steamId});
                return foundTrackedAccount;
            } else {
                throw error;
            }
        }

    }

    async deleteTrackedAccount(id: number): Promise<DeleteResult> {
        const deleted = await this.trackedAccountRepository.delete(id);
        return deleted;
    }
}
