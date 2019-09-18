import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PlayerInMatch } from 'src/match/interface/player.interface';

/**
 * User service
 */
@Injectable()
export class UserService {
    /**
     * Inject dependencies
     * @param userRepository
     */
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    /**
     * Find a User based on their Steam or Faceit ID
     * @param player
     */
    public async findUserBySteamOrFaceItId(player: PlayerInMatch) {
        const response = await this.userRepository.findOne({
            where: [
                {
                    steamId: player.steamId,
                },
                {
                    faceitId: player.faceitId,
                }],
        });
        return response;
    }
}
