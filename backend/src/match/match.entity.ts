import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import TrackedAccount from '../trackedAccount/trackedAccount.entity';

@Entity()
export default class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    map: string;

    @ManyToMany(type => TrackedAccount)
    @JoinTable()
    players: TrackedAccount[]
}