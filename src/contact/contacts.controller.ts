import { Body, Controller,UseInterceptors, Delete, Get, Param, Post, Res, Put, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entity/contact.entity';
import { ContactService } from './contacts.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Query } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createUserDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('relation') relation?:number): Promise<Contact[]> {
    return this.contactService.findAll(relation).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });;
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Query('relation') relation?:number): Promise<Contact> {
    return this.contactService.findOne(id,relation).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.contactService.remove(id,res);
  }
}