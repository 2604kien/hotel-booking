import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host: 'localhost',
      port: 5432,
      username:"postgres",
      password: '26042001',
      database: "nestJS-booking",
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    ConfigModule.forRoot({isGlobal:true,}),
    CategoryModule,
    UserModule,
    BookingModule,
    RoomModule
  ]
})
export class AppModule {}
