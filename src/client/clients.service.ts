import { HttpException, HttpStatus ,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository,getConnection } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entity/client.entity';
import { UpdateClientDto } from './dto/update-contact.dto';
import { RelationClientDto } from './dto/relation-client.dto';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientsRepository: Repository<Client>,){}

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                              Création d'un client                                       //
  /////////////////////////////////////////////////////////////////////////////////////////////
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const clientNew = new Client();
    clientNew.nom_client = createClientDto.nom_client;
    clientNew.code_client = createClientDto.code_client;
    clientNew.addresse = createClientDto.addresse;
    clientNew.telephone = createClientDto.telephone;
    clientNew.contacts = createClientDto.contacts;
    clientNew.affaires = createClientDto.affaires;
    clientNew.prospect = createClientDto.prospect;
    //save du nouveau clients et les données son validé grace au dto
    return this.clientsRepository.save(clientNew).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                        Recupérer un client par ID avec ses relations                    //
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findClientWithRelationByID(id: number,relationClientDto: RelationClientDto): Promise<Client> {
    let client_ = await this.clientsRepository.findOne(id,{relations:relationClientDto.relations});
    if(client_ === undefined){
      throw new HttpException("Aucun client récupéré",HttpStatus.NOT_FOUND);
    }else{
      return client_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                              Récuperer tous les clients                                 //
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findAll(): Promise<Client[]> {
    let clients_ = await this.clientsRepository.find();
    if(clients_.length === 0){
      throw new HttpException("Aucun client récupéré",HttpStatus.NOT_FOUND);
    }else{
      return clients_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                              Récuperer 1 seul client par son ID                         //
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findOne(id: number): Promise<Client> {
    let client_ = await this.clientsRepository.findOne(id);
    if(client_ === undefined){
      throw new HttpException("Aucun client récupéré",HttpStatus.NOT_FOUND);
    }else{
      return client_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                              Mise a jour du client et de ses relation                   //
  /////////////////////////////////////////////////////////////////////////////////////////////
  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client>{
    let client_ = await this.clientsRepository.findOne(id);
    if(client_ === undefined){
      throw new HttpException("Client inconnue",HttpStatus.NOT_FOUND);
    }

    client_.code_client = updateClientDto.code_client;
    client_.nom_client = updateClientDto.nom_client;
    client_.addresse = updateClientDto.addresse;
    client_.telephone = updateClientDto.telephone;
    client_.prospect = updateClientDto.prospect;
    client_.utilisateur = updateClientDto.utilisateur;

    client_ = await this.clientsRepository.save(client_).then(()=>{
      return this.clientsRepository.findOne(id).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
      });
    }).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
    });

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
    if(updateClientDto.affaires != undefined){
      await getConnection()
      .createQueryBuilder()
      .relation(Client, "affaires")
      .of(client_)
      .add(updateClientDto.affaires).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
      });
    }
    if(updateClientDto.contacts != undefined){
      await getConnection()
      .createQueryBuilder()
      .relation(Client, "contacts")
      .of(client_)
      .addAndRemove(updateClientDto.contacts,updateClientDto.contacts).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
      });
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
     return client_;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                              Supression par l'id du client                              //
  /////////////////////////////////////////////////////////////////////////////////////////////
  async remove(id: number,res: Response): Promise<void> {
    this.clientsRepository.delete(id).then((rslt) => {
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(404).send({
          "Message":"Echec suppression",
           "Error":"Client inconnue"
          });
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
}