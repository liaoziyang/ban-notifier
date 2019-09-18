import { Controller, Get, Param, ParseIntPipe, Post, Delete, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TrackedAccountService } from './tracked-account.service';
import TrackedAccount from './trackedAccount.entity';
import { CreateTrackedAccountDto } from './dto/create-tracked-account.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * Web controller
 */
@Controller('tracked-account')
@UseGuards(AuthGuard())
export class TrackedAccountController {
    /**
     * Inject dependencies
     * @param trackedAccountService 
     */
    constructor(private trackedAccountService: TrackedAccountService) { }

    /**
     * Get TrackedAccount by ID
     * @param id 
     */
    @Get('/:id')
    getTrackedAccountById(@Param('id', ParseIntPipe) id: number): Promise<TrackedAccount> {
        return this.trackedAccountService.getTrackedAccountById(id);
    }

    /**
     * Create a new TrackedAccount
     * Possibly depracated?
     */
    @Post()
    @UsePipes(ValidationPipe)
    createdTrackedAccount(@Body() createTrackedAccountDto: CreateTrackedAccountDto): Promise<TrackedAccount> {
        return this.trackedAccountService.createTrackedAccount(createTrackedAccountDto);
    }

    /**
     * Delete a TrackedAccount
     * @param id 
     */
    @Delete('/:id')
    deleteTrackedAccountByid(@Param('id', ParseIntPipe) id: number) {
        return this.trackedAccountService.deleteTrackedAccount(id);
    }

}
