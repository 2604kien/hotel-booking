import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
    constructor(private roomService:RoomService){}
    @Get()
    async getAllRoom(){
        return this.roomService.getAll();
    }
    @Get(':id')
    async getOneRoom(@Param('id') id:number){
        return this.roomService.getOneRoom(id);
    }
    @Post()
    async createNewRoom(@Body() data:RoomDto){
        return this.roomService.createRoom(data);
    }
    @Put(':id')
    async updateRoom(@Param('id') id:number,@Body() data:RoomDto){
        return this.roomService.updateRoom(id, data);
    }
    @Delete(':id')
    async deleteRoom(@Param('id') id: number){
        return this.roomService.deleteRoom(id);
    }
}
