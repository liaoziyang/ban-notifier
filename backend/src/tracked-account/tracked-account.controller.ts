import { Controller } from '@nestjs/common';
import { TrackedAccountService } from './tracked-account.service';

@Controller('tracked-account')
export class TrackedAccountController {
    constructor(private trackedAccountService: TrackedAccountService) {

    }
}
