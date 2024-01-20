import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
                    id:true,
                    name:true,
                    description:true
                }
            }
        });
    }
    async getOneRoom(id:number):Promise<Room>{
        return await this.roomRepository.findOne({
            where:{
                id:id
            },
            
                relations:{
                    category:true,
                },
                select:{
                    category:{
                        id:true,
                        name:true,
                        description:true
                    }
                }
            
        });
    }
    async createRoom(data:RoomDto){
        try{
            const room=new Room();
            room.roomNumber=data.roomNumber;
            room.roomDetail=data.roomDetail;
            room.category=data.category;
            room.price=data.price;
            room.imageNames=data.imageNames;
            return this.roomRepository.save(room);
        }
        catch(err){
            throw new HttpException('The same room number is created', HttpStatus.CONFLICT);
        }
    }
    async updateRoom(id:number, data:RoomDto):Promise<Room>{
        await this.roomRepository.update(id, data);
        return this.roomRepository.findOne({
            where:{
                id:id
            },
            
                relations:{
                    category:true,
                },
                select:{
                    category:{
                        id:true,
                        name:true,
                        description:true
                    }
                }
            
        });
    }
    async deleteRoom(id:number):Promise<Object>{
        await this.roomRepository.delete(id);
        return {message:"Room detail is deleted successfully"}
    }
}
