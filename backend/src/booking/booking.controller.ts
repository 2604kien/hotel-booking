import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
    constructor(private bookingService:BookingService){}
    @Get()
    getAllBooking(){
        return this.bookingService.getAllBooking();
    }
    @Get(':id')
    getOneBooking(@Param('id') id:number){
        return this.bookingService.getBookingById(id);
    }
    @Post()
    createNewBooking(@Body() data:BookingDto){
        return this.bookingService.createNewBooking(data);
    }
    @Put(':id')
    updateOneBooking(@Param('id') id:number, @Body() data:BookingDto){

        return this.bookingService.updateOneBooking(id,data);
    }
    @Delete(':id')
    deleteOneBooking(@Param('id') id:number){
        return this.bookingService.deleteOneBooking(id);
    }
}
