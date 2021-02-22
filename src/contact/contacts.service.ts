import { HttpStatus ,Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto'
import { Contact } from './entity/contact.entity';
import { DatabaseError } from 'pg-protocol';

export const isQueryFailedError = (err: unknown): err is QueryFailedError & DatabaseError =>
  err instanceof QueryFailedError;


@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,){}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contactNew = new Contact();
    contactNew.nom_contact = createContactDto.nom_contact;
    contactNew.code_contact = createContactDto.code_contact;
    contactNew.addresse = createContactDto.addresse;
    contactNew.telephone = createContactDto.telephone;
    contactNew.clients = createContactDto.clients;
    return this.contactsRepository.save(contactNew).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
  }

  async findAll(Relation?: number): Promise<Contact[]> {
    let relation:string[] = [];
    if(Relation == 1){
      relation[0] = "clients";
    }
    let contacts_ = this.contactsRepository.find({relations: relation});
    if(contacts_ === undefined){
      throw new HttpException("Aucune contact récupéré",HttpStatus.NOT_FOUND);
    }else{
      return contacts_;
    }
  }

  async findOne(id: number,Relation?: number): Promise<Contact> {
    let relation:string[] = [];
    if(Relation == 1){
      relation[0] = "clients";
    }
    let contact_ = await this.contactsRepository.findOne(id, {relations: relation});
    if(contact_ === undefined){
      throw new HttpException("Contact inconnue",HttpStatus.NOT_FOUND);
    }else{
      return contact_;
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact>{
    let contact_ = await this.contactsRepository.findOne(id);
    if(contact_ === undefined){
      throw new HttpException("Contact inconnue",HttpStatus.NOT_FOUND);
    }
    contact_.code_contact = updateContactDto.code_contact;
    contact_.nom_contact = updateContactDto.nom_contact;
    return this.contactsRepository.save(contact_).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
  }

  async remove(id: number,res: Response): Promise<void> {
    this.contactsRepository.delete(id).then((rslt) => {
      console.log(rslt.affected)
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(404).send({
          "Message":"Echec suppression",
           "Error":"Utilisateur inconnue"
          });
      }
    });
  }
}