import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { AvancementService } from './avancement.service';
import { CreateAvancementDto } from './dto/create-avancement.dto';
import { RelationAvancementDto } from './dto/relation-avancement.dto';
import { UpdateAvancementDto } from './dto/update-avancement.dto';
import { Avancement } from './entities/avancement.entity';

@Controller('avancement')
export class AvancementController {
  constructor(private readonly avancementService: AvancementService) {}

  @Post()
  create(@Body() createAvancementDto: CreateAvancementDto): Promise<Avancement> {
    return this.avancementService.create(createAvancementDto);
  }

  @Post(":id/relation")
  async recupAvancementWithRelationByID(@Param('id',) id: number,@Body() relationAvancementDto: RelationAvancementDto): Promise<Avancement> {
    return this.avancementService.recupAvancementWithRelationByID(id, relationAvancementDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  findAll(): Promise<Avancement[]> {
    return this.avancementService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });;
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Avancement> {
    return this.avancementService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAvancementDto: UpdateAvancementDto): Promise<Avancement> {
    return this.avancementService.update(id, updateAvancementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.avancementService.remove(id,res);
  }
}
