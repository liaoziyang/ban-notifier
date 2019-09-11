import { Controller, Get } from '@nestjs/common';

@Controller('/ban')
export class BanController {
    @Get()
    getAllBans() {
        return {}
    }
}
