import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module'
import { BookingModule } from './booking/booking.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import * as path from "path";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host: 'booking-db',
      port: 5432,
      username:"postgres",
      password: '26042001',
      database: "nestJS-booking",
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    ConfigModule.forRoot({isGlobal:true,}),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    CategoryModule,
    UserModule,
    BookingModule,
    RoomModule,
    AuthModule
  ]
})
export class AppModule {}
