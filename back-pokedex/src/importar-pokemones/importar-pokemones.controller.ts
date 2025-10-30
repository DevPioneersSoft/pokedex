import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportarPokemonesService } from './importar-pokemones.service';

@Controller('importar-pokemones')
export class ImportarPokemonesController {
  constructor(private readonly importarPokemonesService: ImportarPokemonesService) {}

 
  @Get()
  ImportarPokemon() {
    return this.importarPokemonesService.importar();
  }

  
}
