import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import ListenedModel from "./Listened";
import PodcastModel from "./Podcast";

@Entity('user')
export default class UserModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    username: string

    @Column()
    password: string

    @ManyToMany(type => ListenedModel, listened => listened.id)
    listened: ListenedModel[]
    
    @ManyToMany(type => PodcastModel, podcast => podcast.id)
    @JoinTable({name: "subscriptions"})
    subscriptions: PodcastModel[]
}