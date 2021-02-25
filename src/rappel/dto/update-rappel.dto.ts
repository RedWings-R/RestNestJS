import { PartialType } from '@nestjs/mapped-types';
import { CreateRappelDto } from './create-rappel.dto';

export class UpdateRappelDto extends PartialType(CreateRappelDto) {}
