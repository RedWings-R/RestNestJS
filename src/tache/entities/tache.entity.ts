import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Utilisateur } from "../../utilisateur/entity/utilisateur.entity"

@Entity()
export class Tache {
    @PrimaryGeneratedColumn()
    idtache: number;

    @Column("varchar", { length: 45 })
    description: string;

    @Column("datetime")
    date_creation: Date;

    @Column("tinyint")
    cloturer: boolean;

    @ManyToOne(() => Utilisateur, utilisateur => utilisateur.taches, { cascade: true })
    @JoinColumn()
    utilisateur: Utilisateur;
}
