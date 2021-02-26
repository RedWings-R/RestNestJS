import { HttpStatus ,Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { getConnection, QueryFailedError, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto'
import { Contact } from './entity/contact.entity';
import { DatabaseError } from 'pg-protocol';
import { RelationContactDto } from './dto/relation-contact.dto';

export const isQueryFailedError = (err: unknown): err is QueryFailedError & DatabaseError =>
  err instanceof QueryFailedError;


@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,){}

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contactNew = new Contact();
    contactNew.nom_contact = createContactDto.nom_contact;
    contactNew.code_contact = createContactDto.code_contact;
    contactNew.addresse = createContactDto.addresse;
    contactNew.telephone = createContactDto.telephone;
    contactNew.clients = createContactDto.clients;
    contactNew.prenom_contact = createContactDto.prenom_contact;
    return this.contactsRepository.save(contactNew).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findAll(): Promise<Contact[]> {
    let contacts_ = await this.contactsRepository.find();
    if(contacts_.length === 0){
      throw new HttpException("Aucune contact récupéré",HttpStatus.NOT_FOUND);
    }else{
      return contacts_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async recupClientWithRelationByID(id: number,relationContactDto: RelationContactDto): Promise<Contact> {
    let contact_ = await this.contactsRepository.findOne(id,{relations:relationContactDto.relations});
    if(contact_ === undefined){
      throw new HttpException("Aucun contact récupéré",HttpStatus.NOT_FOUND);
    }else{
      return contact_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findOne(id: number): Promise<Contact> {
    let contact_ = await this.contactsRepository.findOne(id);
    if(contact_ === undefined){
      throw new HttpException("Contact inconnue",HttpStatus.NOT_FOUND);
    }else{
      return contact_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact>{
    let contact_ = await this.contactsRepository.findOne(id);
    if(contact_ === undefined){
      throw new HttpException("Contact inconnue",HttpStatus.NOT_FOUND);
    }
    contact_.code_contact = updateContactDto.code_contact;
    contact_.nom_contact = updateContactDto.nom_contact;
    contact_.addresse = updateContactDto.addresse;
    contact_.prenom_contact = updateContactDto.prenom_contact;
    contact_.telephone = updateContactDto.telephone;

    contact_ = await this.contactsRepository.save(contact_).then(()=>{
      return this.contactsRepository.findOne(id).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
      });
    }).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
    });

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
    if(updateContactDto.clients != undefined){
      await getConnection()
      .createQueryBuilder()
      .relation(Contact, "clients")
      .of(contact_)
      .addAndRemove(updateContactDto.clients,updateContactDto.clients).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
      });
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//

    return contact_;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async remove(id: number,res: Response): Promise<void> {
    this.contactsRepository.delete(id).then((rslt) => {
      console.log(rslt.affected)
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(404).send({
          "Message":"Echec suppression",
           "Error":"Contact inconnue"
          });
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
}