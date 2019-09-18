import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { CsgoMatchDto } from '../dto/csgoMatch.dto';
import { MatchType } from '../match.type.interface';
import { PlayerInMatch } from '../interface/player.interface';

/**
 * Transforms data from the Faceit API into usable form
 */
@Injectable()
export class FaceItMatchPipe implements PipeTransform<any, CsgoMatchDto> {
    /**
     * Does the thing :)
     * @param value 
     */
    transform(value: any): CsgoMatchDto {

        const players: PlayerInMatch[] = value.teams.faction1.players.concat(value.teams.faction2.players).map(player => {
            return {
                steamId: player.game_player_id,
                faceitId: player.player_id,
                faceitUsername: player.nickname,
                steamUsername: player.game_player_name,
            };
        });

        const data: CsgoMatchDto = {
            id: value.match_id,
            // Faceit returns date in seconds but JS parses dates in ms
            date: new Date(parseInt(value.finished_at, 10) * 1000),
            externalId: value.match_id,
            type: MatchType.CSGOFaceIt,
            players,
        };

        return data;
    }
}
