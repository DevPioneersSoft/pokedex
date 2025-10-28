import { Module } from '@nestjs/common';
import { ImportarPokemonesService } from './importar-pokemones.service';
import { ImportarPokemonesController } from './importar-pokemones.controller';

@Module({
  controllers: [ImportarPokemonesController],
  providers: [ImportarPokemonesService],
})
export class ImportarPokemonesModule {}
