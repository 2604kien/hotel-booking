import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    name: string;
    @Column()
    description: string;
    @OneToMany(()=>Room, room=>room.category,{
        cascade: true,
        nullable:true,
    })
    roomList:Room[]
}