import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import Ban from '../ban/ban.entity';
import User from '../user/user.entity';

@Entity()
export default class TrackedAccount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    steamId: string;

    @OneToMany(type => Ban, ban => ban.trackedAccount)
    bans: Ban[];

    @ManyToMany(type => User)
    @JoinTable()
    trackedBy: User[];
}
