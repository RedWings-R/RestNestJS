import { Utilisateur } from "src/utilisateur/entity/utilisateur.entity";

export class CreateRendezVousDto {
    date_heure_debut: Date;
    date_heure_fin: Date;
    description: string;
    utilisateur: Utilisateur;
}
