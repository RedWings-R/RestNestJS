import { Affaire } from 'src/affaire/entities/affaire.entity';
import { Utilisateur } from 'src/utilisateur/entity/utilisateur.entity';
import { Entity, Column, PrimaryGeneratedColumn,ManyToMany,JoinTable, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Contact } from '../../contact/entity/contact.entity'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  idclient: number;

  @Column("varchar", { length: 45 })
  code_client: string;

  @Column("varchar", { length: 45 })
  nom_client: string;

  @Column("varchar", { length: 45 })
  addresse: string;

  @Column("varchar", { length: 45 })
  telephone: string;

  @Column({ type: 'boolean', default: false})
  prospect: boolean;

  @ManyToMany(() => Contact, contact => contact.clients, { cascade: true })
  @JoinTable()
  contacts: Contact[];

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.clients, { cascade: true })
  @JoinColumn()
  utilisateur: Utilisateur;

  @OneToMany(() => Affaire, affaire => affaire.client)
  affaires: Affaire[];
}