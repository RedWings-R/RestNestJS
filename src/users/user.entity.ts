import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idutilisateur: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;
}