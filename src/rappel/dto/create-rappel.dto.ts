import { Utilisateur } from "src/utilisateur/entity/utilisateur.entity";

export class CreateRappelDto {
    date_heure: Date;
    telephone: string;
    description: string;
    utilisateur: Utilisateur;
}
