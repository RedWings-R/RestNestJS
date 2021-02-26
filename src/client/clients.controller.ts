import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entity/client.entity';
import { ClientService } from './clients.service';
import { UpdateClientDto } from './dto/update-contact.dto';
import { RelationClientDto } from '../client/dto/relation-client.dto';

//Routing pour l'url /clients
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                             Route poste création client                                 //
  /////////////////////////////////////////////////////////////////////////////////////////////
  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                             Route poste récuperer client avec relation par l'id         //
  /////////////////////////////////////////////////////////////////////////////////////////////
  @Post(":id/relation")
  async findClientWithRelationByID(@Param('id',) id: number,@Body() relationClientDto: RelationClientDto): Promise<Client> {
    return this.clientService.findClientWithRelationByID(id, relationClientDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                             Récuperer tous les clients                                  //
  /////////////////////////////////////////////////////////////////////////////////////////////
  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                             Route récuperer client par son id                           //
  /////////////////////////////////////////////////////////////////////////////////////////////
  @Get(':id')
  async findOne(@Param('id',) id: number): Promise<Client> {
    return this.clientService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                             Route put mise a jour du client                             //
  /////////////////////////////////////////////////////////////////////////////////////////////
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                             Route suppimer client par son id                            //
  /////////////////////////////////////////////////////////////////////////////////////////////
  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.clientService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}