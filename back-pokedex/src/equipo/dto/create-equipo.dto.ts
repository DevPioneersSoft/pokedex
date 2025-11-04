import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ArrayMaxSize, ArrayMinSize, IsInt, Min } from 'class-validator';

export class CreateEquipoDto {
  @ApiProperty({
    description: 'Lista de IDs de Pokémon para el equipo',
    example: [1, 4, 7, 25, 150, 151],
    type: [Number],
    minItems: 1,
    maxItems: 6
  })
  @IsArray({ message: 'Los pokemonIds deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos 1 Pokémon en el equipo' })
  @ArrayMaxSize(6, { message: 'El equipo no puede tener más de 6 Pokémon' })
  @IsNumber({}, { each: true, message: 'Cada ID de Pokémon debe ser un número' })
  @IsInt({ each: true, message: 'Cada ID de Pokémon debe ser un número entero' })
  @Min(1, { each: true, message: 'Cada ID de Pokémon debe ser mayor a 0' })
  pokemonIds: number[];
}
