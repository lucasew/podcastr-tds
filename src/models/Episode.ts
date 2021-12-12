import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import ListenedModel from "./Listened";
import PodcastModel from "./Podcast";
import UserModel from "./User";

@Entity('episode')
export default class EpisodeModel {
    @PrimaryColumn({nullable: false, unique: true})
    guid: string;

    @Column({nullable: false})
    title: string;

    @Column()
    description: string

    @Column()
    mp3url: string

    @Column({nullable: false})
    pubDate: Date

    @Column({nullable: false, type: 'int'})
    duration: number

    @OneToMany(type => ListenedModel, listened => listened.id)
    listeners: ListenedModel[]

    @ManyToOne(type => PodcastModel, podcast => podcast.id, {nullable: false})
    podcast: PodcastModel
}