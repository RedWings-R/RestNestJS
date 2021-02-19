import { HttpException, HttpStatus ,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entity/client.entity';
import { UpdateClientDto } from './dto/update-contact.dto';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientsRepository: Repository<Client>,){}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const clientNew = new Client();
    clientNew.nom_client = createClientDto.nom_client;
    clientNew.code_client = createClientDto.code_client;
    clientNew.addresse = createClientDto.addresse;
    clientNew.telephone = createClientDto.telephone;
    clientNew.contacts = createClientDto.contacts;
    return this.clientsRepository.save(clientNew).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
  }

  async findAll(): Promise<Client[]> {
    let client_ = this.clientsRepository.find({ relations: ["contacts"] });
    if(client_ === undefined){
      throw new HttpException("Aucun client récupéré",HttpStatus.NOT_FOUND);
    }else{
      return client_;
    }
  }

  async findOne(id: number): Promise<Client> {
    let client_ = await this.clientsRepository.findOne(id,{relations:["contacts"]});
    if(client_ === undefined){
      throw new HttpException("Aucun client récupéré",HttpStatus.NOT_FOUND);
    }else{
      return client_;
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client>{
    let client_ = await this.clientsRepository.findOne(id);
    if(client_ === undefined){
      throw new HttpException("Contact inconnue",HttpStatus.NOT_FOUND);
    }
    client_.code_client = updateClientDto.code_client;
    client_.nom_client = updateClientDto.nom_client;
    client_.addresse = updateClientDto.addresse;
    client_.telephone = updateClientDto.telephone;
    client_.contacts = updateClientDto.contacts;
    return this.clientsRepository.save(client_).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
  }


  async remove(id: number,res: Response): Promise<void> {
    this.clientsRepository.delete(id).then((rslt) => {
      console.log(rslt.affected)
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
}