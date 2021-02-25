import { PartialType } from '@nestjs/mapped-types';
import { CreateAppelDto } from './create-appel.dto';

export class UpdateAppelDto extends PartialType(CreateAppelDto) {}
