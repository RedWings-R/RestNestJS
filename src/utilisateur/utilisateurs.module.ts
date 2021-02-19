import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entity/utilisateur.entity';
import { UsersController } from './utilisateurs.controller';
import { UsersService } from './utilisateurs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}