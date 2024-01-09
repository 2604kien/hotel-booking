import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    fullName:string;
    @Column({unique:true})
    username: string;
    @Column()
    password: string;
    @Column()
    email:string;
    @Column()
    mobilePhone:string;
    @Column({nullable:true})
    refreshToken:string;
    @Column("text", {nullable:true, default:['Member'], array:true})
    roles:string[]
    @OneToMany(()=>Booking, booking=>booking.user,{
        cascade: true,
        nullable:true
    })
    bookingList:User[]
}