import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ParametrageService } from './parametrage.service';
import { CreateParametrageDto } from './dto/create-parametrage.dto';
import { UpdateParametrageDto } from './dto/update-parametrage.dto';

@Controller('parametrage')
export class ParametrageController {
  constructor(private readonly parametrageService: ParametrageService) {}

  @Post()
  create(@Body() createParametrageDto: CreateParametrageDto) {
    return this.parametrageService.create(createParametrageDto);
  }

  @Get()
  findAll() {
    return this.parametrageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parametrageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateParametrageDto: UpdateParametrageDto) {
    return this.parametrageService.update(+id, updateParametrageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parametrageService.remove(+id);
  }
}
