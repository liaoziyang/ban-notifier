import { Repository, EntityRepository } from "typeorm";
import TrackedAccount from "./trackedAccount.entity";


@EntityRepository(TrackedAccount)
export class TrackedAccountRepository extends Repository<TrackedAccount> {

}