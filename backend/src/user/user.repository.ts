import { Repository, EntityRepository, Not, IsNull } from 'typeorm';
import User from './user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            this.logger.debug(`New user signed up with username ${username}`);
        } catch (error) {
            if (error.code === '23505') { // Duplicate username
                throw new ConflictException('Username already exists');
            } else {
                this.logger.error(`Failed to signup user ${user.username}`, error.stack);
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getUsersWithFaceIt(): Promise<User[]> {
        const users = await this.find({ where: { faceitId: Not(IsNull()) }, select: ['faceitId', 'username'] })
        return users;
    }

}
