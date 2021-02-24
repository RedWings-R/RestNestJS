import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entity/utilisateur.entity';
import { UsersService } from './utilisateurs.service';

@Controller('utilisateurs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
    return this.usersService.update(id, updateUtilisateurDto);
  }

  @Post()  
  async create(@Body() createUserDto: CreateUserDto): Promise<Utilisateur> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('relation') relation?:number): Promise<Utilisateur[]> {
    return this.usersService.findAll(relation).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Query('relation') relation?:number): Promise<Utilisateur> {
    return this.usersService.findOne(id, relation).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    this.usersService.remove(id,res);
  }
}