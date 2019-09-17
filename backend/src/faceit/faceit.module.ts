import { Module, HttpModule } from '@nestjs/common';
import { FaceitService } from './faceit.service';
import { BullModule } from 'nest-bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    BullModule.register({
      name: 'faceit',
    }),
    HttpModule,
    ConfigModule
  ],
  providers: [FaceitService]
})
export class FaceitModule { }
