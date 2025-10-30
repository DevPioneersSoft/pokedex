import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PrismaService],
})
export class PokemonModule { }

