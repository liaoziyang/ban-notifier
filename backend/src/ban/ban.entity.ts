import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import TrackedAccount from '../trackedAccount/trackedAccount.entity';

@Entity()
export default class Ban {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    detectedAt: Date;

    @Column()
    type: string; // Placeholder, needs an interface for types of bans

    @ManyToOne(type => TrackedAccount, trackedAccount => trackedAccount.bans)
    trackedAccount: TrackedAccount;
}
