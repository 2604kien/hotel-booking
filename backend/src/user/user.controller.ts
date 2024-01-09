import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/enum/role.enum';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAllUser(){
        return this.userService.getAll();
    }
    @Role(Roles.Admin, Roles.Member)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getUserById(@Param('id') id:number){
        return this.userService.getOneUser(id);
    }
    @Post()
    async createUser(@Body() data:UserDto){
        return this.userService.createNewUser(data);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateUser(@Param('id') id:number, @Body() data:UserDto){
        return this.userService.updateUserById(id, data);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number){
        return this.userService.deleteUserById(id);
    }
}
