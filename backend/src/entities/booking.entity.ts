import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Room } from "./room.entity";

@Entity()
export class Booking{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    checkIn: Date;
    @Column()
    checkOut:Date;
    @Column()
    price: number;
    @Column({default: true})
    isPaid: boolean;
    @ManyToOne(()=>User, user=>user.bookingList, {
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    user:User;
    @ManyToOne(()=>Room, room=>room.bookingList, {
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    room:Room
}
