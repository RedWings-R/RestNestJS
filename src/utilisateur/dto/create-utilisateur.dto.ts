import { Client } from "src/client/entity/client.entity";
import { Tache } from "src/tache/entities/tache.entity";

export class CreateUserDto {
    prenom: string;
    nom: string;
    identifiant: string;
  }