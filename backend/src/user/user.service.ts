import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import User from './user.entity';
import { PlayerInMatch } from 'src/match/interface/player.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

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
