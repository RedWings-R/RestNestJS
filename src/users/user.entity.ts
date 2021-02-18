import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class utilisateur {
  @PrimaryGeneratedColumn()
  idutilisateur: number;

  @Column("varchar", { length: 45 })
  prenom: string;

  @Column("varchar", { length: 45 })
  nom: string;
}