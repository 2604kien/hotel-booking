import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Booking])],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
