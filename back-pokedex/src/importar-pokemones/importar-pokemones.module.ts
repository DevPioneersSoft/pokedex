import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImportarPokemonesController } from './importar-pokemones.controller';
import { ImportarPokemonesService } from './importar-pokemones.service';

@Module({
  controllers: [ImportarPokemonesController],
  providers: [ImportarPokemonesService, PrismaService],
})
export class ImportarPokemonesModule { }

