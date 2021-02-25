import { Utilisateur } from "src/utilisateur/entity/utilisateur.entity";

export class CreateAppelDto {
    telephone: string;
    description: string;
    date_heure_debut: Date;
    date_heure_fin: Date;
    utilisateur: Utilisateur;
}
