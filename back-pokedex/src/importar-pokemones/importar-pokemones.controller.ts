import { Controller, Get } from '@nestjs/common';
import { ImportarPokemonesService } from './importar-pokemones.service';

@Controller('importar-pokemones')
export class ImportarPokemonesController {
  constructor(private readonly importarPokemonesService: ImportarPokemonesService) { }

  @Get()
  inportarPokemon() {
    return this.importarPokemonesService.importar();
  }
}

