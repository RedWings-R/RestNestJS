import { Utilisateur } from 'src/utilisateur/entity/utilisateur.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Appel {
    @PrimaryGeneratedColumn()
    idappel: number;

    @Column("datetime")
    date_heure_debut: Date;

    @Column("datetime")
    date_heure_fin: Date;

    @Column("varchar", { length: 150 })
    description: string;

    @Column("varchar", { length: 15 })
    telephone: string;

    @ManyToOne(() => Utilisateur, utilisateur => utilisateur.appels, { cascade: true })
    @JoinColumn()
    utilisateur: Utilisateur;
}