import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, Unique } from 'typeorm';
import Match from '../match/match.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column('text', { nullable: true })
    steamId: string;

    @Column('text', { nullable: true })
    discordId: string;

    @Column('text', { nullable: true })
    faceitId: string;

    @Column('text', { nullable: true })
    faceitName: string;

    @ManyToMany(type => Match)
    playedInMatch: Match[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
