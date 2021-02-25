import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { AppelService } from './appel.service';
import { CreateAppelDto } from './dto/create-appel.dto';
import { RelationAppelDto } from './dto/relation-appel.dto';
import { UpdateAppelDto } from './dto/update-appel.dto';
import { Appel } from './entities/appel.entity';

@Controller('appel')
export class AppelController {
  constructor(private readonly appelService: AppelService) {}

  @Post()
  create(@Body() createAppelDto: CreateAppelDto): Promise<Appel> {
    return this.appelService.create(createAppelDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async findAppelWithRelationByID(@Param('id') id: number,@Body() relationAppelDto: RelationAppelDto): Promise<Appel> {
    return this.appelService.findAppelWithRelationByID(id, relationAppelDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  findAll(): Promise<Appel[]> {
    return this.appelService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<Appel> {
    return this.appelService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAppelDto: UpdateAppelDto):Promise<Appel> {
    return this.appelService.update(+id, updateAppelDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.appelService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}
