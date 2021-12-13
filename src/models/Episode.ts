import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import ListenedModel from "./Listened";
import PodcastModel from "./Podcast";

@Entity('episode')
export default class EpisodeModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false, unique: true})
    guid: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    url: string

    @Column({nullable: true})
    icon: string

    @Column()
    description: string

    @Column()
    mp3url: string

    @Column({nullable: false})
    pubDate: Date

    @Column({nullable: false, type: 'int'})
    duration: number

    @OneToMany(type => ListenedModel, listened => listened.episode, {lazy: true})
    @JoinColumn()
    listeners: Promise<ListenedModel[]>

    @ManyToOne(type => PodcastModel, podcast => podcast.episodes, {nullable: false, lazy: true})
    podcast: PodcastModel
}