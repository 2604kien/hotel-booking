import { HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from "bcrypt";
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
            @InjectRepository(User)
            private readonly userRepository:Repository<User>,
            private readonly accessTokenService:JwtService,
            private readonly refreshTokenService:JwtService,
        ){}
    async login(data:AuthDto, response: Response):Promise<Object>{
        const user=await this.userRepository.findOne({
            where:{
                username: data.username
            }
        })
        if(!user){
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        const hashedPwd=await bcrypt.compare(data.password, user.password);
        if(!hashedPwd){
            throw new HttpException('Password does not match', HttpStatus.UNAUTHORIZED);
        }
    
        const accessToken=await this.accessTokenService.signAsync({UserInfo:{username:user.username, roles:user.roles}},{
            secret:`${process.env.JWT_TOKEN_SECRET}`
        });
        const refreshToken=await this.refreshTokenService.signAsync({UserInfo:{username:user.username}}, {
            secret:`${process.env.JWT_TOKEN_SECRET}`,
            expiresIn:'7d'
        });
        await this.userRepository.update(user.id, {refreshToken: refreshToken});
        response.cookie('jwt',refreshToken,{
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7*24*60*60*1000
        })
        return {accessToken:accessToken}
    }
    async refresh( request: Request){
        const cookie=request.cookies;
        if(!cookie?.jwt){
            throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
        }
        try{
            const payload = await this.refreshTokenService.verify(cookie.jwt)
            const foundedUser=await this.userRepository.findOne({
                where:{
                    username:payload.UserInfo.username
                }
            })
            if(!foundedUser){
                throw new UnauthorizedException('No user found');
            }
            const accessToken=await this.accessTokenService.signAsync({UserInfo:{username:foundedUser.username, roles:foundedUser.roles}});
            return {accessToken:accessToken};

        } 
        catch (err) {
            if (err instanceof UnauthorizedException) {
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            } else {
              throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
          }
        
    }
    async logout(request: Request, response:Response){
        const cookie=request.cookies;
        if(!cookie){
            throw new HttpException('No Content', HttpStatus.NO_CONTENT);
        }
        response.clearCookie('jwt', {
            httpOnly:true,
            sameSite:'none',
            secure: true
        })
        return {message:"Cookie is cleared"};
    }
}
