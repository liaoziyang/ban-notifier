import { Controller, Get, Param, ParseIntPipe, Post, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrackedAccountService } from './tracked-account.service';
import TrackedAccount from './trackedAccount.entity';
import { CreateTrackedAccountDto } from './dto/create-tracked-account.dto';

@Controller('tracked-account')
export class TrackedAccountController {
    constructor(private trackedAccountService: TrackedAccountService) { }

    @Get('/live')
    getLiveData() {
        return {
            today: (Math.floor(Math.random() * Math.floor(100))).toString(),
            month: (Math.floor(Math.random() * Math.floor(50000))).toString(),
            lastUser: { name: "FilthyCheater", steamId: "76561198028175941" }

        }
    }

    @Get('/:id')
    getTrackedAccountById(@Param('id', ParseIntPipe) id: number): Promise<TrackedAccount> {
        return this.trackedAccountService.getTrackedAccountById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createdTrackedAccount(@Body() createTrackedAccountDto: CreateTrackedAccountDto): Promise<TrackedAccount> {
        return this.trackedAccountService.createTrackedAccount(createTrackedAccountDto);
    }

    @Delete('/:id')
    deleteTrackedAccountByid(@Param('id', ParseIntPipe) id: number) {
        return this.trackedAccountService.deleteTrackedAccount(id);
    }


}
