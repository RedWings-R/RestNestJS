
import { Affaire } from 'src/affaire/entities/affaire.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Avancement {
    @PrimaryGeneratedColumn()
    idavancement: number;

    @Column('decimal',{ precision: 10, scale: 2 })
    pourcentage_avancement: number;

    @Column("decimal",{ precision: 10, scale: 2 })
    ponderation: number;

    @Column('datetime')
    date:Date;

    @OneToOne(() => Affaire, affaire => affaire.avancement, { cascade: true }) // specify inverse side as a second parameter
    @JoinColumn()
    affaire: Affaire;
}