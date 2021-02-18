import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilisateur } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([utilisateur])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}