import { Affaire } from "src/affaire/entities/affaire.entity";

export class CreateAvancementDto {
    pourcentage_avancement: number;
    ponderation:number;
    affaire: Affaire;
    date: Date;
}
