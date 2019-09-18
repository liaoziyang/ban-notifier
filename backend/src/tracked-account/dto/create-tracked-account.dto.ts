
import { IsNotEmpty } from 'class-validator';

/**
 * DTO with validation for TrackedAccount creation
 */
export class CreateTrackedAccountDto {
    /**
     * Steam identifier
     */
    @IsNotEmpty()
    readonly steamId: string;
}
