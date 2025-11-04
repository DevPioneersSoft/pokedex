import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional, Min, MaxLength } from 'class-validator';
import { tipoPokemon } from 'generated/prisma/client';

export class tipoPokemonEntity implements tipoPokemon{
    @ApiProperty({ 
        description: 'ID único del Pokémon',
        example: 1
    })
    @IsInt({ message: 'El ID debe ser un número entero' })
    @IsNotEmpty({ message: 'El ID es requerido' })
    @Min(1, { message: 'El ID debe ser mayor a 0' })
    id: number;

    @ApiProperty({ 
        description: 'Nombre del Pokémon',
        example: 'bulbasaur'
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
    nombre: string;
  
}
