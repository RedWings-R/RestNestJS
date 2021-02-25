import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { RelationUtilisateurDto } from './dto/relation-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entity/utilisateur.entity';
import { UsersService } from './utilisateurs.service';

@Controller('utilisateurs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id')
  update(@Param('id') id: number,@Body() updateUtilisateurDto: UpdateUtilisateurDto) {
    return this.usersService.update(id, updateUtilisateurDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async findUtilisateurWithRelationByID(@Param('id') id: number,@Body() relationUtilisateurDto: RelationUtilisateurDto): Promise<Utilisateur> {
    return this.usersService.findUtilisateurWithRelationByID(id, relationUtilisateurDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post()  
  async create(@Body() createUserDto: CreateUserDto): Promise<Utilisateur> {
    return this.usersService.create(createUserDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  async findAll(): Promise<Utilisateur[]> {
    return this.usersService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number,): Promise<Utilisateur> {
    return this.usersService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    this.usersService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}