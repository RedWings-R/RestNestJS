import { Client } from '../../client/entity/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Avancement } from 'src/avancement/entities/avancement.entity';

@Entity()
export class Affaire {
    @PrimaryGeneratedColumn()
    idaffaire: number;

    @Column("datetime")
    date_creation: Date;

    @Column("datetime")
    date_fin: Date;

    @Column("decimal")
    montant: number;

    @ManyToOne(() => Client, client => client.affaires, { cascade: true })
    @JoinColumn()
    client: Client;

    @OneToOne(() => Avancement, avancement => avancement.affaire) 
    avancement: Avancement;
}