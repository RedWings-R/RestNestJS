import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entity/contact.entity';
import { ContactController } from './contacts.controller';
import { ContactService } from './contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}