import { Body, Controller, Delete, Get, Param, Post, Res, Put, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entity/contact.entity';
import { ContactService } from './contacts.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { RelationContactDto } from './dto/relation-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createUserDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createUserDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Post(":id/relation")
  async recupClientWithRelationByID(@Param('id',) id: number,@Body() relationContactDto: RelationContactDto): Promise<Contact> {
    return this.contactService.recupClientWithRelationByID(id, relationContactDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactService.findAll().catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Contact> {
    return this.contactService.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res() res: Response): Promise<void> {
    return this.contactService.remove(id,res).catch((err) => {
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    });
  }
}