import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CreateAvancementDto } from './dto/create-avancement.dto';
import { RelationAvancementDto } from './dto/relation-avancement.dto';
import { UpdateAvancementDto } from './dto/update-avancement.dto';
import { Avancement } from './entities/avancement.entity';

@Injectable()
export class AvancementService {
  constructor(@InjectRepository(Avancement) private readonly avancementReposiory: Repository<Avancement>,){}

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  create(createAvancementDto: CreateAvancementDto):Promise<Avancement> {
    const avancementNew = new Avancement();
    
    avancementNew.affaire = createAvancementDto.affaire;
    avancementNew.ponderation = createAvancementDto.ponderation;
    avancementNew.pourcentage_avancement = createAvancementDto.pourcentage_avancement;
    avancementNew.date = createAvancementDto.date;

    return this.avancementReposiory.save(avancementNew).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async recupAvancementWithRelationByID(id: number,relationAvancementDto: RelationAvancementDto): Promise<Avancement> {
    let avancement_ = await this.avancementReposiory.findOne(id,{relations:relationAvancementDto.relations});
    if(avancement_ === undefined){
      throw new HttpException("Aucun avancement récupéré",HttpStatus.NOT_FOUND);
    }else{
      return avancement_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findAll(): Promise<Avancement[]> {
    let avancement_ = await this.avancementReposiory.find();
    if(avancement_.length === 0){
      throw new HttpException("Aucun avancement récupéré",HttpStatus.NOT_FOUND);
    }else{
      return avancement_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findOne(id: number): Promise<Avancement> {
    let avancement_ = await this.avancementReposiory.findOne(id);
    if(avancement_ === undefined){
      throw new HttpException("Aucun avancement récupéré",HttpStatus.NOT_FOUND);
    }else{
      return avancement_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async update(id: number, updateAvancementDto: UpdateAvancementDto): Promise<Avancement>{
    let avancement_ = await this.avancementReposiory.findOne(id);
    if(avancement_ === undefined){
      throw new HttpException("Avancement inconnue",HttpStatus.NOT_FOUND);
    }

    avancement_.affaire = updateAvancementDto.affaire;
    avancement_.ponderation = updateAvancementDto.ponderation;
    avancement_.pourcentage_avancement = updateAvancementDto.pourcentage_avancement;
    avancement_.date = updateAvancementDto.date;

    avancement_ = await this.avancementReposiory.save(avancement_).then(()=>{
      return this.avancementReposiory.findOne(id).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
      });
    }).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.UNAUTHORIZED);
    });

    return avancement_;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async remove(id: number,res: Response): Promise<void> {
    this.avancementReposiory.delete(id).then((rslt) => {
      console.log(rslt.affected)
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(404).send({
          "Message":"Echec suppression",
           "Error":"Avancement inconnue"
          });
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
}
