import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import ListenedModel from "./Listened";
import PodcastModel from "./Podcast";

@Entity('user')
export default class UserModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    is_admin: boolean

    @Column({nullable: false, unique: true})
    username: string

    @Column()
    password: string

    @ManyToMany(type => ListenedModel, listened => listened.id, {lazy: true})
    listened: ListenedModel[]
    
    @ManyToMany(type => PodcastModel, podcast => podcast.id, {eager: true})
    @JoinTable({name: "subscriptions"})
    subscriptions: PodcastModel[]
}