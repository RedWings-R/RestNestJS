import { Module } from '@nestjs/common';
import { AvancementService } from './avancement.service';
import { AvancementController } from './avancement.controller';
import { Avancement } from './entities/avancement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Avancement])],
  controllers: [AvancementController],
  providers: [AvancementService]
})
export class AvancementModule {}
