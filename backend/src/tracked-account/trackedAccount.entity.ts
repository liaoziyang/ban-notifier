import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity, Unique, Index } from 'typeorm';
import Ban from '../ban/ban.entity';
import User from '../user/user.entity';

/**
 * Database record
 */
@Entity()
@Unique(['steamId'])
export default class TrackedAccount extends BaseEntity {
    /**
     * Primary key
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Steam identifier
     */
    @Column()
    steamId: string;

    /**
     * Bans detected for this user
     */
    @OneToMany(type => Ban, ban => ban.trackedAccount)
    bans: Ban[];

    /**
     * Which users track this account
     */
    @ManyToMany(type => User)
    @JoinTable()
    trackedBy: User[];
}
