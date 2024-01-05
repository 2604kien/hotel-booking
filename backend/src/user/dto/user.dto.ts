import { IsNotEmpty, IsString } from "class-validator";

export class UserDto{
    @IsString()
    @IsNotEmpty()
    fullName:string;
    @IsString()
    @IsNotEmpty()
    username:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    mobilePhone:string;
}