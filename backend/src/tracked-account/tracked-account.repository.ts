import { Repository, EntityRepository } from 'typeorm';
import TrackedAccount from './trackedAccount.entity';

/**
 * Database operations for TrackedAccount
 */
@EntityRepository(TrackedAccount)
export class TrackedAccountRepository extends Repository<TrackedAccount> {

}
