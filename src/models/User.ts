import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
class UserModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    username: string

    @Column()
    password: string


}