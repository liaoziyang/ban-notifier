
import { IsNotEmpty } from 'class-validator';

export class CreateTrackedAccountDto {
    @IsNotEmpty()
    readonly steamId: string;
}