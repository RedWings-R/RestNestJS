import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}