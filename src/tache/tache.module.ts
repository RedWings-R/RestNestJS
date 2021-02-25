import { Module } from '@nestjs/common';
import { TacheService } from './tache.service';
import { TacheController } from './tache.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tache } from './entities/tache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tache])],
  controllers: [TacheController],
  providers: [TacheService]
})
export class TacheModule {}
