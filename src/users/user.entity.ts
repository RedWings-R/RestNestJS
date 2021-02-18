import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class utilisateur {
  @PrimaryGeneratedColumn()
  idutilisateur: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;
}