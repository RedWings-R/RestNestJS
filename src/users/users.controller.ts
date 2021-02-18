import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { UsersService } from './users.services';
  import { User } from './user';
  import { Users } from './users';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly itemsService: UsersService) {}
  
    @Get()
    async findAll(): Promise<Users> {
      return this.itemsService.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: number): Promise<User> {
      return this.itemsService.findOne(id);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      this.itemsService.remove(id);
    }
  }