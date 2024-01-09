import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
@Controller('room')
export class RoomController {
    constructor(private roomService:RoomService){}
    @Get()
    async getAllRoom(){
        return this.roomService.getAll();
    }
    @Role(Roles.Member, Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOneRoom(@Param('id') id:number){
        return this.roomService.getOneRoom(id);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createNewRoom(@Body() data:RoomDto){
        return this.roomService.createRoom(data);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files:Array<Express.Multer.File>){
        const response = [];
        files.forEach(file => {
            const fileReponse = {
            originalname: file.originalname,
            filename: file.filename,
            
            };
            response.push(fileReponse);
        });
        return response;

    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateRoom(@Param('id') id:number,@Body() data:RoomDto){
        return this.roomService.updateRoom(id, data);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteRoom(@Param('id') id: number){
        return this.roomService.deleteRoom(id);
    }
}
