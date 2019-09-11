import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany } from 'typeorm';
import Match from '../match/match.entity';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    steamId: string;

    @Column()
    discordId: string;

    @ManyToMany(type => Match)
    playedInMatch: Match[]
}
