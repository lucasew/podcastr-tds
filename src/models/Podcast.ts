import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({nullable: true})
    description?: string

    @ManyToMany(type => UserModel, user => user.listened, {lazy: true})
    @JoinTable()
    subscribers: Promise<UserModel[]>

    @OneToMany(type => EpisodeModel, episode => episode.podcast)
    @JoinColumn()
    episodes: EpisodeModel[]
}