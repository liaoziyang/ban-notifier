import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TrackedAccountRepository } from './tracked-account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import TrackedAccount from './trackedAccount.entity';
import { DeleteResult } from 'typeorm';
import { CreateTrackedAccountDto } from './dto/create-tracked-account.dto';

/**
 * Service for TrackedAccount
 */
@Injectable()
export class TrackedAccountService {
    /**
     * The logger
     */
    private logger = new Logger('TrackedAccountService');

    /**
     * Inject dependencies
     * @param trackedAccountRepository 
     */
    constructor(
        @InjectRepository(TrackedAccountRepository)
        private trackedAccountRepository: TrackedAccountRepository) { }

    /**
     * Find a trackedAccount by ID
     * @param id 
     */
    async getTrackedAccountById(id: number): Promise<TrackedAccount> {
        const found = await this.trackedAccountRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`TrackedAccount with ID "${id}" not found`);
        }

        return found;
    }

    /**
     * Create a tracked account
     * If an account with the same Steam ID already exists, the existing record is returned
     * @param createTrackedAccountDto 
     */
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

    /**
     * Delete record from database
     * @param id 
     */
    async deleteTrackedAccount(id: number): Promise<DeleteResult> {
        const deleted = await this.trackedAccountRepository.delete(id);
        return deleted;
    }
}
