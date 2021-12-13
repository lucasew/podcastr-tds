import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import EpisodeModel from "./Episode";
import UserModel from "./User";

@Entity('listened')
export default class ListenedModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'int'})
    position: number

    @Column()
    isListened: boolean

    @UpdateDateColumn({})
    lastActivity: Date

    @ManyToOne(type => UserModel, user => user.id, {eager: true})
    user: UserModel

    @ManyToOne(type => EpisodeModel, episode => episode.guid, {lazy: true})
    episode: EpisodeModel
}