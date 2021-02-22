import { Client } from 'src/client/entity/client.entity';
import { Rappel } from 'src/rappel/entities/rappel.entity';
import { RendezVous } from 'src/rendez-vous/entities/rendez-vous.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Tache } from "../../tache/entities/tache.entity"

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  idutilisateur: number;

  @Column("varchar", { length: 45 })
  prenom: string;

  @Column("varchar", { length: 45 })
  nom: string;

  @OneToMany(() => Tache, tache => tache.utilisateurs)
  taches: Tache[];

  @OneToMany(() => Client, client => client.utilisateurs)
  clients: Client[];

  @OneToMany(() => Rappel, rappel => rappel.utilisateurs)
  rappels: Rappel[];

  @OneToMany(() => RendezVous, rendezVous => rendezVous.utilisateurs)
  rendezVous: RendezVous[];
}