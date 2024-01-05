import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository:Repository<Room>
    ){}
    async getAll():Promise<Room[]>{
        return await this.roomRepository.find({
            relations:{
                category:true,
            },
            select:{
                category:{
                    name:true
                }
            }
        });
    }
    async getOneRoom(id:number):Promise<Room>{
        return await this.roomRepository.findOneBy({id});
    }
    async createRoom(data:RoomDto):Promise<Room>{
        const room=new Room();
        room.roomNumber=data.roomNumber;
        room.roomDetail=data.roomDetail;
        room.category=data.category;
        return await this.roomRepository.save(room);
    }
    async updateRoom(id:number, data:RoomDto):Promise<Room>{
        await this.roomRepository.update(id, data);
        return this.roomRepository.findOneBy({id});
    }
    async deleteRoom(id:number):Promise<Object>{
        await this.roomRepository.delete(id);
        return {message:"Room detail is deleted successfully"}
    }
}
