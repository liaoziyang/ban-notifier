import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, Unique } from 'typeorm';
import TrackedAccount from '../tracked-account/trackedAccount.entity';
import { MatchType } from './match.type.interface';

@Entity()
@Unique(['externalId'])
export default class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    type: MatchType;

    // Faceit match ID (ex: 1-6105a0dc-0e73-4033-8941-1a28c75470d8)
    // Or MM match ID (ex: TODO)
    @Column()
    externalId: string;

    @ManyToMany(type => TrackedAccount)
    @JoinTable()
    players: TrackedAccount[];
}
