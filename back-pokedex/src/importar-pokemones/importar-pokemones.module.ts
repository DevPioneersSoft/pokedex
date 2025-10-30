import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ImportarPokemonesService } from './importar-pokemones.service';
import { ImportarPokemonesController } from './importar-pokemones.controller';
import { PrismaService } from 'src/prisma/prisma.service';
=======
import { PrismaService } from 'src/prisma/prisma.service';
import { ImportarPokemonesController } from './importar-pokemones.controller';
import { ImportarPokemonesService } from './importar-pokemones.service';
>>>>>>> back

@Module({
  controllers: [ImportarPokemonesController],
  providers: [ImportarPokemonesService, PrismaService],
})
<<<<<<< HEAD
export class ImportarPokemonesModule {}
=======
export class ImportarPokemonesModule { }
>>>>>>> back
