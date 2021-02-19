import { PartialType } from '@nestjs/mapped-types';
import { CreateParametrageDto } from './create-parametrage.dto';

export class UpdateParametrageDto extends PartialType(CreateParametrageDto) {}
