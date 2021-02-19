import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './utilisateur/utilisateurs.module';
import { UsersController } from './utilisateur/utilisateurs.controller'
import { ClientModule } from './client/clients.module';
import { ContactModule } from './contact/contacts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ClientModule,
    ContactModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController);
  }
}