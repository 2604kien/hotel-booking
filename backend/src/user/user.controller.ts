import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    async getAllUser(){
        return this.userService.getAll();
    }
    @Get(':id')
    async getUserById(@Param('id') id:number){
        return this.userService.getOneUser(id);
    }
    @Post()
    async createUser(@Body() data:UserDto){
        return this.userService.createNewUser(data);
    }
    @Put(':id')
    async updateUser(@Param('id') id:number, @Body() data:UserDto){
        return this.userService.updateUserById(id, data);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: number){
        return this.userService.deleteUserById(id);
    }
}
