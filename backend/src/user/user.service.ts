import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}
    async getAll():Promise<User[]>{
        return await this.userRepository.find();
    }
    async getOneUser(id:number):Promise<User>{
        return await this.userRepository.findOneBy({id})
    }
    async createNewUser(data:UserDto){
        try{
            const user=new User();
            user.fullName=data.fullName;
            user.username=data.username;
            user.password=await bcrypt.hash(data.password, 10);
            user.email=data.email;
            user.mobilePhone=data.mobilePhone;
            return await this.userRepository.save(user);
        }
        catch(err){
            throw new HttpException('The same user with that username is created', HttpStatus.CONFLICT);
        }
    }
    async updateUserById(id:number, data:UserDto){
        await this.userRepository.update(id, data);
        return this.userRepository.findOneBy({id});
    }
    async deleteUserById(id:number):Promise<any>{
        await this.userRepository.delete(id);
        return {message:"Deleted user successfully"};
    }
}
