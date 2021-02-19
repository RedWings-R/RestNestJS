import { ApiProperty } from '@nestjs/swagger';
import { Client } from "src/client/entity/client.entity";

export class CreateContactDto {
  code_contact: string;
  nom_contact: string;
  addresse: string;
  telephone: string;
  clients: Client[];
  }