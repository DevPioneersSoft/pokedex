import { Module } from '@nestjs/common';
import { ImportarPokemonesService } from './importar-pokemones.service';
import { ImportarPokemonesController } from './importar-pokemones.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ImportarPokemonesController],
  providers: [ImportarPokemonesService, PrismaService],
})
export class ImportarPokemonesModule {}
