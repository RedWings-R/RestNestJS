import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res, HttpStatus, HttpException } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { Response } from 'express';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
import { RendezVous } from './entities/rendez-vous.entity';
import { RelationRendezVousDto } from './dto/relation-rendez-vous.dto';

@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}

  @Post()
  create(@Body() createRendezVousDto: CreateRendezVousDto) {
    return this.rendezVousService.create(createRendezVousDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async findRendezVousWithRelationByID(@Param('id',) id: number,@Body() relationRendezVousDto: RelationRendezVousDto): Promise<RendezVous> {
    return this.rendezVousService.findRendezVousWithRelationByID(id, relationRendezVousDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  findAll():Promise<RendezVous[]> {
    return this.rendezVousService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<RendezVous> {
    return this.rendezVousService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRendezVousDto: UpdateRendezVousDto) {
    return this.rendezVousService.update(id, updateRendezVousDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.rendezVousService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}
