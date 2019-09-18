import { MatchType } from "../match.type.interface";
import TrackedAccount from "../../tracked-account/trackedAccount.entity";

export class CsgoMatchDto {
    type: MatchType;
    date: Date;
    externalId: string;
    players: Array<TrackedAccount>;
}