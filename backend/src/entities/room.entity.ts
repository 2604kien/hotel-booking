import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Booking } from "./booking.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    roomNumber: number;

    @Column()
    roomDetail: string;
    @Column("text", {array:true, nullable:true})
    imageNames:string[];
    @Column({nullable:true})
    price:number;
    @Column('boolean', {default:'true'})
    isDisplay: boolean;
    @ManyToOne(() => Category, category => category.roomList, {
        onDelete:'SET NULL',
        onUpdate:'CASCADE',
    })
    category: Category;
    
    @OneToMany(()=>Booking, booking=>booking.room,{
        cascade: true,
        nullable:true,
    })
    bookingList: Booking[]
}