import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PrismaService, PrismaErrorHandlerService],
})
export class PokemonModule {}
