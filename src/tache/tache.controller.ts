import { Controller, Get, Post, Body, Put, Param, Delete, Res, Query, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { TacheService } from './tache.service';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';
import { Tache } from './entities/tache.entity';
import { HttpStatus } from '@nestjs/common';
import { RelationTacheDto } from './dto/relation-tache.dto';

@Controller('taches')
export class TacheController {
  constructor(private readonly tacheService: TacheService) {}

  @Post()
  async create(@Body() createTacheDto: CreateTacheDto):Promise<Tache> {
    return this.tacheService.create(createTacheDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async findTacheWithRelationByID(@Param('id') id: number,@Body() relationTacheDto: RelationTacheDto): Promise<Tache> {
    return this.tacheService.findTacheWithRelationByID(id, relationTacheDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  async findAll():Promise<Tache[]> {
    return this.tacheService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Tache> {
    return this.tacheService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTacheDto: UpdateTacheDto):Promise<Tache> {
    return this.tacheService.update(id, updateTacheDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.tacheService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}
