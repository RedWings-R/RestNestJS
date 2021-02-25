import { Utilisateur } from 'src/utilisateur/entity/utilisateur.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Rappel {
  @PrimaryGeneratedColumn()
  idrappel: number;

  @Column("varchar", { length: 15 })
  telephone: string;

  @Column("varchar", { length: 150 })
  description: string;

  @Column("datetime")
  date_heure: Date;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.rappels, { cascade: true })
  @JoinColumn()
  utilisateur: Utilisateur;
}
