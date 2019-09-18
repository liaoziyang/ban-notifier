import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { CsgoMatchDto } from "../dto/csgoMatch.dto";
import { MatchType } from "../match.type.interface";

@Injectable()
export class FaceItMatchPipe implements PipeTransform<any, CsgoMatchDto> {
    transform(value: any): CsgoMatchDto {
        const data: CsgoMatchDto = {
            date: new Date(value["finished_at"]),
            externalId: value["match_id"],
            type: MatchType.CSGOFaceIt,
            players: value.teams.faction1.players.concat(value.teams.faction2.players)
        }

        return data;
    }
}