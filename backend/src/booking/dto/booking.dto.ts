import { IsNotEmpty, IsString } from "class-validator";
import { Room } from "src/entities/room.entity";
import { User } from "src/entities/user.entity";

export class BookingDto{
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    room:Room;
    @IsNotEmpty()
    checkIn:Date;
    @IsNotEmpty()
    checkOut:Date;
    @IsNotEmpty()
    price:number;
}