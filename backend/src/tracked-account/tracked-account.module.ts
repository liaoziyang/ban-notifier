import { Module } from '@nestjs/common';
import { TrackedAccountController } from './tracked-account.controller';
import { TrackedAccountService } from './tracked-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrackedAccount from './trackedAccount.entity';
import { TrackedAccountRepository } from './tracked-account.repository';
import { AuthModule } from '../auth/auth.module';
import { TrackedAccountGateway } from './tracked-account.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([TrackedAccount, TrackedAccountRepository]),
    AuthModule],
  controllers: [TrackedAccountController],
  providers: [TrackedAccountService, TrackedAccountGateway],
})
export class TrackedAccountModule { }
