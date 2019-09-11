import { Module } from '@nestjs/common';
import { TrackedAccountController } from './tracked-account.controller';
import { TrackedAccountService } from './tracked-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrackedAccount from './trackedAccount.entity';
import { TrackedAccountRepository } from './tracked-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrackedAccount, TrackedAccountRepository])],
  controllers: [TrackedAccountController],
  providers: [TrackedAccountService]
})
export class TrackedAccountModule { }
