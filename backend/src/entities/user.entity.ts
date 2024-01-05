import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    fullName:string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    email:string;
    @Column()
    mobilePhone:string;
    @OneToMany(()=>Booking, booking=>booking.user)
    bookingList:User[]
}