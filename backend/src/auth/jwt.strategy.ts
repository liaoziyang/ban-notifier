import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import User from '../user/user.entity';
import { ConfigService } from '../config/config.service';

/**
 * JSON web token strategy for passport
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * Inject dependencies
     * @param userReposity
     * @param config
     */
    constructor(
        @InjectRepository(UserRepository)
        private userReposity: UserRepository,
        config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    /**
     * Validate if a JWT if valid
     * @param payload
     */
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.userReposity.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
