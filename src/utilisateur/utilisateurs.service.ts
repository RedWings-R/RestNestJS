import { HttpException, HttpStatus ,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from './entity/utilisateur.entity';
import { Response } from 'express';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { RelationUtilisateurDto } from './dto/relation-utilisateur.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Utilisateur) private readonly usersRepository: Repository<Utilisateur>,){}

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto): Promise<Utilisateur>{
    let utilisateur_ = await this.usersRepository.findOne(id);
    if(utilisateur_ == undefined){
      throw new HttpException("Utilisateur inconnue",HttpStatus.UNAUTHORIZED);
    }
    utilisateur_.nom = updateUtilisateurDto.nom;
    utilisateur_.prenom = updateUtilisateurDto.prenom;
    utilisateur_.identifiant = updateUtilisateurDto.identifiant;

    utilisateur_ = await this.usersRepository.save(utilisateur_).then(()=>{
      return this.usersRepository.findOne(id).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
      });
    }).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
    if(updateUtilisateurDto.clients != undefined){
      await getConnection()
    .createQueryBuilder()
    .relation(Utilisateur, "clients")
    .of(utilisateur_)
    .add(updateUtilisateurDto.clients).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
    if(updateUtilisateurDto.clients != undefined){
      await getConnection()
    .createQueryBuilder()
    .relation(Utilisateur, "taches")
    .of(utilisateur_)
    .add(updateUtilisateurDto.taches).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
    if(updateUtilisateurDto.clients != undefined){
      await getConnection()
    .createQueryBuilder()
    .relation(Utilisateur, "rendezVous")
    .of(utilisateur_)
    .add(updateUtilisateurDto.rendezVous)    
    .catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
    }
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
    return utilisateur_;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findUtilisateurWithRelationByID(id: number,relationClientDto: RelationUtilisateurDto): Promise<Utilisateur> {
    let utilisateur_ = await this.usersRepository.findOne(id,{relations:relationClientDto.relations});
    if(utilisateur_ === undefined){
      throw new HttpException("Aucun utilisateur récupéré",HttpStatus.NOT_FOUND);
    }else{
      return utilisateur_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async create(createUserDto: CreateUserDto): Promise<Utilisateur> {
    const user = new Utilisateur();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    user.identifiant = createUserDto.identifiant;
    return this.usersRepository.save(user);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findAll(): Promise<Utilisateur[]> {
    let utilisateur_ = await this.usersRepository.find();
    if(utilisateur_.length === 0){
      throw new HttpException("Aucun utilisateur récupéré",HttpStatus.UNAUTHORIZED);
    }else{
      return utilisateur_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findOne(id: number): Promise<Utilisateur> {

    let utilisateur_ = await this.usersRepository.findOne(id);
    if(utilisateur_ == undefined){
      throw new HttpException("Aucun utilisateur récupéré",HttpStatus.UNAUTHORIZED);
    }else{
      return utilisateur_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async remove(id: number,res: Response): Promise<void> {
    this.usersRepository.delete(id).then((rslt) => {
      console.log(rslt.affected)
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(404).send({"Message":"Echec suppression",
        "Error":"Utilisateur inconnue"});
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
}