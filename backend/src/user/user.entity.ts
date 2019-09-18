import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, Unique } from 'typeorm';
import Match from '../match/match.entity';
import * as bcrypt from 'bcrypt';

/**
 * Database entity
 */
@Entity()
@Unique(['username'])
export default class User extends BaseEntity {
    /**
     * Primary key
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Username used during registration/signin
     */
    @Column()
    username: string;

    /**
     * Hashed password
     */
    @Column()
    password: string;

    /**
     * Salt used during hashing
     */
    @Column()
    salt: string;

    /**
     * Steam identifier
     */
    @Column('text', { nullable: true })
    steamId: string;

    /**
     * Discord identifier
     */
    @Column('text', { nullable: true })
    discordId: string;

    /**
     * Faceit identifier
     */
    @Column('text', { nullable: true })
    faceitId: string;

    /**
     * Username on Faceit
     */
    @Column('text', { nullable: true })
    faceitName: string;

    /**
     * Matches the user has played in
     */
    @ManyToMany(type => Match)
    playedInMatch: Match[];

    /**
     * Check if a password is correct for user
     * @param password
     */
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
