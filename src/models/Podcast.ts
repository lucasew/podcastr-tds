import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ListenedModel from "./Listened";
import UserModel from "./User";

@Entity('podcast')
export default class PodcastModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false})
    feed: string

    @Column()
    homepage: String

    @Column({nullable: false})
    title: string

    @Column()
    icon: string

    @ManyToMany(type => UserModel, user => user.id)
    subscribers: UserModel[]

    @OneToMany(type => ListenedModel, listened => listened.id)
    listened: ListenedModel[]
}