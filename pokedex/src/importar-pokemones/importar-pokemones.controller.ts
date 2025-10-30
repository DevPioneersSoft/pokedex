import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportarPokemonesService } from './importar-pokemones.service';

@Controller('importar-pokemones')
export class ImportarPokemonesController {
  constructor(private readonly importarPokemonesService: ImportarPokemonesService) {}

  // @Post()
  // create(@Body() createImportarPokemoneDto: CreateImportarPokemoneDto) {
  //   return this.importarPokemonesService.create(createImportarPokemoneDto);
  // }

  @Get()
  importarPokemon() {
    return this.importarPokemonesService.importar();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.importarPokemonesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateImportarPokemoneDto: UpdateImportarPokemoneDto) {
//     return this.importarPokemonesService.update(+id, updateImportarPokemoneDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.importarPokemonesService.remove(+id);
//   }
 }
