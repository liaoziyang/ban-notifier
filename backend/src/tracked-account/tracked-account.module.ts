import { Module } from '@nestjs/common';
import { TrackedAccountController } from './tracked-account.controller';
import { TrackedAccountService } from './tracked-account.service';

@Module({
  controllers: [TrackedAccountController],
  providers: [TrackedAccountService]
})
export class TrackedAccountModule {}
