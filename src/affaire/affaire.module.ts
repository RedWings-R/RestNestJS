import { Module } from '@nestjs/common';
import { AffaireService } from './affaire.service';
import { AffaireController } from './affaire.controller';
import { Affaire } from './entities/affaire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Affaire])],
  controllers: [AffaireController],
  providers: [AffaireService]
})
export class AffaireModule {}
