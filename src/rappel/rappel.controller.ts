import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RappelService } from './rappel.service';
import { CreateRappelDto } from './dto/create-rappel.dto';
import { UpdateRappelDto } from './dto/update-rappel.dto';
import { Rappel } from './entities/rappel.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { RelationRappelDto } from './dto/relation-rappel.dto';

@Controller('rappel')
export class RappelController {
  constructor(private readonly rappelService: RappelService) {}

  @Post()
  create(@Body() createRappelDto: CreateRappelDto) {
    return this.rappelService.create(createRappelDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async findRappelWithRelationByID(@Param('id',) id: number,@Body() relationRappelDto: RelationRappelDto): Promise<Rappel> {
    return this.rappelService.findRappelWithRelationByID(id, relationRappelDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  findAll():Promise<Rappel[]> {
    return this.rappelService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<Rappel> {
    return this.rappelService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRappelDto: UpdateRappelDto) {
    return this.rappelService.update(id, updateRappelDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.rappelService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}
