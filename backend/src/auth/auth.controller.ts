import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('login')
    async login(@Body() data:AuthDto, @Res({passthrough:true}) response:Response){
        return await this.authService.login(data, response);
    }
    @Post('logout')
    async logout(@Req() request:Request, @Res({passthrough:true}) response:Response){
        return await this.authService.logout(request, response);
    }
    @Post('refresh')
    async refesh(@Req() request:Request){
        return await this.authService.refresh(request);
    }
}
