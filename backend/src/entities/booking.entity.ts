import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Room } from "./room.entity";

@Entity()
export class Booking{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>User, user=>user.bookingList)
    user:User;
    @ManyToOne(()=>Room, room=>room.bookingList)
    room:Room
}
