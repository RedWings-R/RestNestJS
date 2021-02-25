import { Module } from '@nestjs/common';
import { RappelService } from './rappel.service';
import { RappelController } from './rappel.controller';
import { Rappel } from './entities/rappel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rappel])],
  controllers: [RappelController],
  providers: [RappelService]
})
export class RappelModule {}
