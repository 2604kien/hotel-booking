import {IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "src/entities/category.entity";

export class RoomDto{
    @IsNumber()
    @IsNotEmpty()
    roomNumber:number;
    @IsString()
    @IsNotEmpty()
    roomDetail:string;
    @IsNotEmpty()
    category: Category;
    @IsNotEmpty()
    imageNames:string[];
}