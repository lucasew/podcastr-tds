import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import EpisodeModel from "./Episode";
import ListenedModel from "./Listened";
import UserModel from "./User";

@Entity('podcast')
export default class PodcastModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false, unique: true})
    feed: string

    @Column()
    homepage: String

    @Column({nullable: false})
    title: string

    @Column()
    icon: string

    @ManyToMany(type => UserModel, user => user.id, {lazy: true})
    subscribers: UserModel[]

    @OneToMany(type => EpisodeModel, episode => episode.id, {lazy: true})
    episodes: EpisodeModel[]
}