import { Injectable } from '@nestjs/common';
import { CreateParametrageDto } from './dto/create-parametrage.dto';
import { UpdateParametrageDto } from './dto/update-parametrage.dto';

@Injectable()
export class ParametrageService {
  create(createParametrageDto: CreateParametrageDto) {
    return 'This action adds a new parametrage';
  }

  findAll() {
    return `This action returns all parametrage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parametrage`;
  }

  update(id: number, updateParametrageDto: UpdateParametrageDto) {
    return `This action updates a #${id} parametrage`;
  }

  remove(id: number) {
    return `This action removes a #${id} parametrage`;
  }
}
