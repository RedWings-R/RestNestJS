import { HttpException, HttpStatus ,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from './entity/utilisateur.entity';
import { Response } from 'express';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Utilisateur) private readonly usersRepository: Repository<Utilisateur>,){}

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto): Promise<Utilisateur>{
    let utilisateur_ = await this.usersRepository.findOne(id);
    if(utilisateur_ == undefined){
      throw new HttpException("Contact inconnue",HttpStatus.NOT_FOUND);
    }
    utilisateur_.nom = updateUtilisateurDto.nom;
    utilisateur_.prenom = updateUtilisateurDto.prenom;
    utilisateur_.clients = updateUtilisateurDto.clients;
    utilisateur_.taches = updateUtilisateurDto.taches;
    return this.usersRepository.save(utilisateur_).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
  }

  async create(createUserDto: CreateUserDto): Promise<Utilisateur> {
    const user = new Utilisateur();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    user.clients = createUserDto.clients;
    user.taches = createUserDto.taches;
    return this.usersRepository.save(user);
  }

  async findAll(Relation?: number): Promise<Utilisateur[]> {
    let relation:string[] = [];
    if(Relation == 1){
      relation[0] = "taches";
      relation[1] = "clients";
      relation[2] = "rendezVous";
    }
    let utilisateur_ = await this.usersRepository.find({ relations: relation });
    if(utilisateur_ === undefined){
      throw new HttpException("Aucun client récupéré",HttpStatus.NOT_FOUND);
    }else{
      return utilisateur_;
    }
  }

  async findOne(id: number,Relation?: number): Promise<Utilisateur> {
    let relation:string[] = [];
    if(Relation == 1){
      relation[0] = "taches";
      relation[1] = "clients";
      relation[2] = "rendezVous";
    }
    let test = this.usersRepository.findOne(id,{relations: relation});
    return test;
  }

  async remove(id: number,res: Response): Promise<void> {
    this.usersRepository.delete(id).then((rslt) => {
      console.log(rslt.affected)
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(404).send({"Message":"Echec suppression", "Error":"Utilisateur inconnue"})
      }
    });
  }
}