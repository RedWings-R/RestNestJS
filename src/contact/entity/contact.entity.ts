import { Entity, Column, PrimaryGeneratedColumn,ManyToMany } from 'typeorm';
import { Client } from "../../client/entity/client.entity"
@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  idcontact: number;

  @Column("varchar", { length: 45 })
  code_contact: string;

  @Column("varchar", { length: 45 })
  nom_contact: string;

  @Column("varchar", { length: 45 })
  addresse: string;

  @Column("varchar", { length: 45 })
  telephone: string;

  @ManyToMany(() => Client, client => client.contacts)
  clients: Client[];
}