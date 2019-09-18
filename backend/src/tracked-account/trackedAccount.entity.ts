import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity, Unique, Index } from 'typeorm';
import Ban from '../ban/ban.entity';
import User from '../user/user.entity';

@Entity()
@Unique(['steamId'])
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
