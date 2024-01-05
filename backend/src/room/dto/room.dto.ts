import { Category } from "src/entities/category.entity";

export interface RoomDto{
    roomNumber:number,
    roomDetail:string,
    category: Category
}