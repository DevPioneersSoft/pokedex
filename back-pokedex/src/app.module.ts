import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PokemonModule,
    ImportarPokemonesModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
