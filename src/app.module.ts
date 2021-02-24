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
import { RendezVousController } from './rendez-vous/rendez-vous.controller';
import { ContactController } from './contact/contacts.controller';
import { ClientController } from './client/clients.controller';
import { ParametrageController } from './parametrage/parametrage.controller';
import { RappelController } from './rappel/rappel.controller';
import { TacheController } from './tache/tache.controller';
import { AffaireController } from './affaire/affaire.controller';
import { AppelController } from './appel/appel.controller';

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
      .forRoutes(
        UsersController, 
        RendezVousController, 
        ContactController, 
        ClientController, 
        ParametrageController, 
        RappelController, 
        TacheController, 
        AffaireController, 
        AppelController
      );
  }
}