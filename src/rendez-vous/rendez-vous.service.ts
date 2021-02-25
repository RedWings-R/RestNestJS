import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { RelationRendezVousDto } from './dto/relation-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
import { RendezVous } from './entities/rendez-vous.entity';

@Injectable()
export class RendezVousService {

  constructor(@InjectRepository(RendezVous) private readonly rendezVousRepository: Repository<RendezVous>,){}

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  create(createRendezVousDto: CreateRendezVousDto): Promise<RendezVous> {
    const rdvNew = new RendezVous();

    rdvNew.date_heure_debut = createRendezVousDto.date_heure_debut;
    rdvNew.date_heure_fin = createRendezVousDto.date_heure_fin;
    rdvNew.description = createRendezVousDto.description;
    rdvNew.utilisateur = createRendezVousDto.utilisateur;

    return this.rendezVousRepository.save(rdvNew).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findRendezVousWithRelationByID(id: number,relationRendezVousDto: RelationRendezVousDto): Promise<RendezVous> {
    let rdv_ = await this.rendezVousRepository.findOne(id,{relations:relationRendezVousDto.relations});
    if(rdv_ === undefined){
      throw new HttpException("Aucun rendez-vous récupéré",HttpStatus.NOT_FOUND);
    }else{
      return rdv_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findAll():Promise<RendezVous[]> {
    let rdv_ = await this.rendezVousRepository.find();
    if(rdv_.length === 0){
      throw new HttpException("Aucun rendez-vous récupéré",HttpStatus.NOT_FOUND);
    }else{
      return rdv_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async findOne(id: number):Promise<RendezVous> {
    let rdv_ = await this.rendezVousRepository.findOne(id);
    if(rdv_ === undefined){
      throw new HttpException("Aucune rendez-vous récupéré",HttpStatus.NOT_FOUND);
    }else{
      return rdv_;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async update(id: number, updateRendezVousDto: UpdateRendezVousDto): Promise<RendezVous>{
    let rdv_ = await this.rendezVousRepository.findOne(id);
    if(rdv_ === undefined){
      throw new HttpException("Rendez-vous inconnue",HttpStatus.NOT_FOUND);
    }
    rdv_.date_heure_debut = updateRendezVousDto.date_heure_debut;
    rdv_.date_heure_fin = updateRendezVousDto.date_heure_fin;
    rdv_.description = updateRendezVousDto.description;
    rdv_.utilisateur = updateRendezVousDto.utilisateur;

    rdv_ = await this.rendezVousRepository.save(rdv_).then(()=>{
      return this.rendezVousRepository.findOne(id).catch((err) => {
        throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
      });
    }).catch((err) => {
      throw new HttpException(err.sqlMessage,HttpStatus.NOT_FOUND);
    });

    return rdv_;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  async remove(id: number,res: Response): Promise<void> {
    this.rendezVousRepository.delete(id).then((rslt) => {
      if(rslt.affected){
        res.status(HttpStatus.OK).send({"Message":"Suppression réussi"});
      }else{
        res.status(HttpStatus.NOT_FOUND).send({
          "Message":"Echec suppression",
           "Error":"Rendez-vous inconnue"
          });
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
}
