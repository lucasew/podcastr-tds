import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}