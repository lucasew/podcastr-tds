import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import ListenedModel from "./Listened";
import PodcastModel from "./Podcast";
import UserModel from "./User";

@Entity('episode')
export default class EpisodeModel {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column({nullable: false, unique: true})
    guid: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    url: string

    @Column()
    description: string

    @Column()
    mp3url: string

    @Column({nullable: false})
    pubDate: Date

    @Column({nullable: false, type: 'int'})
    duration: number

    @OneToMany(type => ListenedModel, listened => listened.id, {lazy: true})
    listeners: ListenedModel[]

    @ManyToOne(type => PodcastModel, podcast => podcast.id, {nullable: false, lazy: true})
    podcast: PodcastModel
}