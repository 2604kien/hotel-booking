import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Booking } from "./booking.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomNumber: number;

    @Column({nullable:true})
    roomDetail: string;

    @ManyToOne(() => Category, category => category.roomList)
    category: Category;

    @OneToMany(()=>Booking, booking=>booking.room)
    bookingList: Booking[]
}