import { Module } from '@nestjs/common';
import { ImportarPokemonService } from './importar-pokemon.service';
import { ImportarPokemonController } from './importar-pokemon.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ImportarPokemonController],
  providers: [ImportarPokemonService, PrismaService],
})
export class ImportarPokemonModule {}
