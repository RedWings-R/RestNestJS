import { Utilisateur } from "src/utilisateur/entity/utilisateur.entity";

export class CreateTacheDto {
    description: string;
    date_creation: Date;
    cloturer: boolean;
    utilisateur: Utilisateur;
}
