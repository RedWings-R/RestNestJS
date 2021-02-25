import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AffaireService } from './affaire.service';
import { CreateAffaireDto } from './dto/create-affaire.dto';
import { RelationAffaireDto } from './dto/relation-affaire.dto';
import { UpdateAffaireDto } from './dto/update-affaire.dto';
import { Affaire } from './entities/affaire.entity';

@Controller('affaires')
export class AffaireController {
  constructor(private readonly affaireService: AffaireService) {}

  @Post()
  create(@Body() createAffaireDto: CreateAffaireDto): Promise<Affaire> {
    return this.affaireService.create(createAffaireDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async recupClientWithRelationByID(@Param('id',) id: number,@Body() relationAffaireDto: RelationAffaireDto): Promise<Affaire> {
    return this.affaireService.recupClientWithRelationByID(id, relationAffaireDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  findAll(): Promise<Affaire[]> {
    return this.affaireService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Affaire> {
    return this.affaireService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAffaireDto: UpdateAffaireDto): Promise<Affaire> {
    return this.affaireService.update(id, updateAffaireDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number,@Res() res: Response) {
    return this.affaireService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}
