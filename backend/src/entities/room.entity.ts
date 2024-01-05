import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

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
}