import { Utilisateur } from 'src/utilisateur/entity/utilisateur.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class RendezVous {
  @PrimaryGeneratedColumn()
  idrendez_vous: Date;

  @Column("datetime")
  date_heure_debut: Date;

  @Column("datetime")
  date_heure_fin: Date;

  @Column("varchar", { length: 150 })
  description: string;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.rendezVous, { cascade: true })
  @JoinColumn()
  utilisateur: Utilisateur;
}
