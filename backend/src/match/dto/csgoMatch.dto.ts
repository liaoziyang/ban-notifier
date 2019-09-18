import { MatchType } from '../match.type.interface';
import { PlayerInMatch } from '../interface/player.interface';

export class CsgoMatchDto {
    id: string;
    type: MatchType;
    date: Date;
    externalId: string;
    players: PlayerInMatch[];
}
