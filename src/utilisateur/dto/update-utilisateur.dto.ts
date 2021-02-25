import { PartialType } from '@nestjs/mapped-types';
import { Client } from 'src/client/entity/client.entity';
import { RendezVous } from 'src/rendez-vous/entities/rendez-vous.entity';
import { Tache } from 'src/tache/entities/tache.entity';
import { CreateUserDto } from './create-utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUserDto) {
    clients: Client[];
    taches: Tache[];
    rendezVous: RendezVous[];
}
