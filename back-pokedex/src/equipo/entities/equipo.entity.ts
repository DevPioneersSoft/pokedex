import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { equipo } from 'generated/prisma/browser';

export class Equipo implements equipo {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  usuarioId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  pokemonId: number;

  @ApiProperty()
  @IsBoolean()
  shiny: boolean;
}