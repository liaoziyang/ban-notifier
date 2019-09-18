import { MatchType } from '../match.type.interface';
import { PlayerInMatch } from '../interface/player.interface';

/**
 * DTO for a CSGO match
 */
export class CsgoMatchDto {
    /**
     * Internal ID
     */
    id?: string;
    /**
     * Type of match
     */
    type: MatchType;
    /**
     * Date the match was played on
     */
    date: Date;
    /**
     * ID gotten from the external service this match was played on
     */
    externalId: string;
    /**
     * Players who played in this match
     */
    players: PlayerInMatch[];
}
