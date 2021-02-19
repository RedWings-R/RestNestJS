import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from './entity/utilisateur.entity';
import { UsersService } from './utilisateurs.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  
  async create(@Body() createUserDto: CreateUserDto): Promise<Utilisateur> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Utilisateur[]> {
    return this.usersService.findAll().catch((err) => {
      return err;
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Utilisateur> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    this.usersService.remove(id,res);
  }
}