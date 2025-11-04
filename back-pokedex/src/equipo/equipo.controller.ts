import { Controller } from '@nestjs/common';
import { EquipoService } from './equipo.service';

@Controller('equipo')
export class EquipoController {

  constructor(private readonly equipoService: EquipoService) { }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({
  //   summary: 'Actualiza el equipo de pokémon del usuario',
  //   description: 'Recibe una lista de IDs de pokémon y actualiza el equipo del usuario, permitiendo un máximo de 6 pokémon'
  // })
  // upsert(@Body() body: UpsertEquipoDto[], @Request() req) {
  //   if (body.length > 6) {
  //     throw new BadRequestException('El equipo no puede tener más de 6 pokemons');
  //   }
  //   return this.equipoService.upsert(body, req.user, req.shinyFound);
  // }
}
