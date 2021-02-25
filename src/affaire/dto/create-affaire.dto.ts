import { Client } from "src/client/entity/client.entity";

export class CreateAffaireDto {
    date_creation:Date;
    date_fin:Date;
    montant:number;
    client:Client;
}
