import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './utilisateur/utilisateurs.module';
import { UsersController } from './utilisateur/utilisateurs.controller'
import { ClientModule } from './client/clients.module';
import { ContactModule } from './contact/contacts.module';
import { ParametrageModule } from './parametrage/parametrage.module';
import { RappelModule } from './rappel/rappel.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { TacheModule } from './tache/tache.module';
import { AffaireModule } from './affaire/affaire.module';
import { AvancementModule } from './avancement/avancement.module';
import { AppelModule } from './appel/appel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ClientModule,
    ContactModule,
    ParametrageModule,
    RappelModule,
    RendezVousModule,
    TacheModule,
    AffaireModule,
    AvancementModule,
    AppelModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController);
  }
}