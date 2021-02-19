import { Contact } from "src/contact/entity/contact.entity";

export class CreateClientDto {
    code_client: string;
    nom_client: string;
    addresse: string;
    telephone: string;
    contacts: Contact[];
  }