import { HttpStatus ,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from './entity/utilisateur.entity';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Utilisateur) private readonly usersRepository: Repository<Utilisateur>,){}

  async create(createUserDto: CreateUserDto): Promise<Utilisateur> {
    const user = new Utilisateur();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Utilisateur[]> {
    
    let test = await this.usersRepository.find();
    return test
  }

  async findOne(id: number): Promise<Utilisateur> {
    let test = this.usersRepository.findOne(id);
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