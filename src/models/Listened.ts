import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import EpisodeModel from "./Episode";
import UserModel from "./User";

@Entity('listened')
@Unique('user_episode', ['user', 'episode'])
export default class ListenedModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'int'})
    position: number

    @Column()
    isListened: boolean

    @UpdateDateColumn({})
    lastActivity: Date

    @ManyToOne(type => UserModel, user => user.listened, {eager: true})
    user: UserModel

    @ManyToOne(type => EpisodeModel, episode => episode.listeners, {lazy: true})
    episode: Promise<EpisodeModel>
}