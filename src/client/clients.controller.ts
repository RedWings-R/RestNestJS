import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entity/client.entity';
import { ClientService } from './clients.service';
import { UpdateClientDto } from './dto/update-contact.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll(@Query('relation') relation?:number): Promise<Client[]> {
    return this.clientService.findAll(relation);
  }

  @Get(':id')
  async findOne(@Param('id',) id: number,@Query('relation') relation?:number): Promise<Client> {
    return this.clientService.findOne(id,relation);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.clientService.remove(id,res);
  }
}