import { PartialType } from '@nestjs/mapped-types';
import { CreateAvancementDto } from './create-avancement.dto';

export class UpdateAvancementDto extends PartialType(CreateAvancementDto) {}
