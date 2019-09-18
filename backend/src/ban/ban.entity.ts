import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import TrackedAccount from '../tracked-account/trackedAccount.entity';

/**
 * Database representation of a ban
 */
@Entity()
export default class Ban {
    /**
     * Primary key
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * When was the ban detected
     */
    @Column()
    detectedAt: Date;

    /**
     * Type of ban
     * VAC, game, economy, faceit, ...
     */
    @Column()
    type: string; // TODO Placeholder, needs an interface for types of bans

    /**
     * Link bans to trackedAccount
     */
    @ManyToOne(type => TrackedAccount, trackedAccount => trackedAccount.bans)
    trackedAccount: TrackedAccount;
}
