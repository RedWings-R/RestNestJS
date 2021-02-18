import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { utilisateur } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(utilisateur) private readonly usersRepository: Repository<utilisateur>,){}

  async create(createUserDto: CreateUserDto): Promise<utilisateur> {
    const user = new utilisateur();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<utilisateur[]> {
    
    let test = await this.usersRepository.find();
    console.log(test)
    return test
  }

  async findOne(id: string): Promise<utilisateur> {
    let test = this.usersRepository.findOne(id);
    return test;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}