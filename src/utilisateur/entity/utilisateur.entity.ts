import { Appel } from 'src/appel/entities/appel.entity';
import { Client } from 'src/client/entity/client.entity';
import { Rappel } from 'src/rappel/entities/rappel.entity';
import { RendezVous } from 'src/rendez-vous/entities/rendez-vous.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tache } from "../../tache/entities/tache.entity"

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  idutilisateur: number;

  @Column("varchar", { length: 45 })
  prenom: string;

  @Column("varchar", { length: 45 })
  nom: string;

  @Column("varchar", { length: 45 })
  identifiant: string;

  @OneToMany(() => Tache, tache => tache.utilisateur)
  taches: Tache[];

  @OneToMany(() => Client, client => client.utilisateur)
  clients: Client[];

  @OneToMany(() => Rappel, rappel => rappel.utilisateur)
  rappels: Rappel[];

  @OneToMany(() => RendezVous, rendezVous => rendezVous.utilisateur)
  rendezVous: RendezVous[];

  @OneToMany(() => Appel, appel => appel.utilisateur)
  appels: Appel[];
}