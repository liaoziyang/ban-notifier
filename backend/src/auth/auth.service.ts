import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {
    /**
     * The logger
     */
    private logger = new Logger('AuthService');
    /**
     * Inject dependencies
     * @param userRepository 
     * @param jwtService 
     */
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    /**
     * Register a new user
     * @param authCredentialsDto 
     */
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    /**
     * Log in a user
     * Returns a JWT
     * @param authCredentialsDto 
     */
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`User "${username}" signed in successfully. Generated JWT with payload: "${JSON.stringify(payload)}"`);
        return { accessToken };
    }
}
