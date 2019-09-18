import { Controller, Get, NotImplementedException } from '@nestjs/common';

/**
 * Web actions for Ban
 */
@Controller('/ban')
export class BanController {
    /**
     * Get all bans
     */
    @Get()
    getAllBans() {
        throw new NotImplementedException();
    }
}
