import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('booking')
export class BookingController {
    constructor(private bookingService:BookingService){}
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllBooking(){
        return this.bookingService.getAllBooking();
    }
    @Role(Roles.Admin, Roles.Member)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getOneBooking(@Param('id') id:number){
        return this.bookingService.getBookingById(id);
    }
    @Role(Roles.Admin, Roles.Member)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createNewBooking(@Body() data:BookingDto){
        return this.bookingService.createNewBooking(data);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOneBooking(@Param('id') id:number, @Body() data:BookingDto){

        return this.bookingService.updateOneBooking(id,data);
    }
    @Role(Roles.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOneBooking(@Param('id') id:number){
        return this.bookingService.deleteOneBooking(id);
    }
}
