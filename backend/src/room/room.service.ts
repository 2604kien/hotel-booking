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
    async findAll(){
        return await this.roomRepository.find();
    }
    async createRoom(data:RoomDto){
        const room=new Room();
        room.roomNumber=data.roomNumber;
        room.roomDetail=data.roomDetail;
        room.category=data.category;
        return await this.roomRepository.save(room);
    }
}
