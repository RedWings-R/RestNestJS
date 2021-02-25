import { Module } from '@nestjs/common';
import { AppelService } from './appel.service';
import { AppelController } from './appel.controller';
import { Appel } from './entities/appel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Appel])],
  controllers: [AppelController],
  providers: [AppelService]
})
export class AppelModule {}
