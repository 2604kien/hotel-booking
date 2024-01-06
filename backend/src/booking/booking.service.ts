import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository:Repository<Booking>
    ){}
    async getAllBooking():Promise<Booking[]>{
        return await this.bookingRepository.find({
            relations:{
                user:true,
                room:true,
            },
            select:{
                user:{
                    fullName:true,
                    id:true,
                    email:true,
                    mobilePhone:true,
                }

            }
        });
    }
    async getBookingById(id:number):Promise<Booking>{
        return await this.bookingRepository.findOne({
            where:{
                id:id
            },
            relations:{
                    user:true,
                    room:true,
            },
            select:{
                    user:{
                        fullName:true,
                        id:true,
                        email:true,
                        mobilePhone:true,
                    }
    
            }
            
        })
    }
    async createNewBooking(data:BookingDto):Promise<Booking>{
        const booking=new Booking();
        booking.user=data.user;
        booking.room=data.room;
        return this.bookingRepository.save(booking);
    }
    async updateOneBooking(id:number, data:BookingDto):Promise<Booking>{
        const result= await this.bookingRepository.update(id, data);
        
        return this.bookingRepository.findOneBy({id});
    }
    async deleteOneBooking(id:number):Promise<any>{
        await this.bookingRepository.delete(id);
        return {message:"A booking is deleted successfully"}
    }

}
