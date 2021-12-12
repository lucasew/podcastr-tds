import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('episode')
export default class EpisodeModel {
    @PrimaryColumn({nullable: false, unique: true, type: 'string'})
    guid: string;

    @Column({nullable: false})
    title: string;

    @Column()
    description: string

    @Column()
    mp3url: string

    @Column({nullable: false, type: 'timestamp'})
    pubDate: Date

    @Column({nullable: false, type: 'int'})
    duration: number
}