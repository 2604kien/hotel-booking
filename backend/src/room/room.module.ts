import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[TypeOrmModule.forFeature([Room]),
  MulterModule.register({
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images/room');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
      },
    }),
  })],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
