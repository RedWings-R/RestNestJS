import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { utilisateur } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<utilisateur> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<utilisateur[]> {
    return this.usersService.findAll().catch((err) => {
      return err;
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<utilisateur> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}