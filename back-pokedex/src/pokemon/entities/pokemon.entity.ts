import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from 'generated/prisma/client';
import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional, Min, MaxLength, IsArray } from 'class-validator';
import { tipoPokemonEntity } from './tipo_pokemon.entity';

export class PokemonEntity implements Pokemon{
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

    @ApiProperty({ 
        description: 'Descripción del Pokémon',
        example: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.'
    })
    @IsString({ message: 'La descripción debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción es requerida' })
    descripcion: string;

    @ApiProperty({ 
        description: 'Tipos del Pokémon separados por coma',
        example: 'grass,poison'
    })
    @IsString({ message: 'Los tipos deben ser un texto' })
    @IsNotEmpty({ message: 'Los tipos son requeridos' })
    types: string;

    @ApiProperty({ 
        description: 'URL del grunido del Pokémon',
        example: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg'
    })
    @IsString({ message: 'El grunido debe ser un texto' })
    @IsNotEmpty({ message: 'El grunido es requerido' })
    @IsUrl({}, { message: 'El grunido debe ser una URL válida' })
    grunido: string;

    @ApiProperty({ 
        description: 'URL de la imagen del Pokémon',
        example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    })
    @IsString({ message: 'La imagen debe ser un texto' })
    @IsNotEmpty({ message: 'La imagen es requerida' })
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
    imagen: string;

    @ApiProperty({ 
        description: 'Puntos de vida del Pokémon',
        example: 45,
        nullable: true
    })
    @IsOptional()
    @IsInt({ message: 'La vida debe ser un número entero' })
    @Min(0, { message: 'La vida debe ser mayor o igual a 0' })
    vida: number | null;

    @ApiProperty({ 
        description: 'Puntos de ataque del Pokémon',
        example: 49,
        nullable: true
    })
    @IsOptional()
    @IsInt({ message: 'El ataque debe ser un número entero' })
    @Min(0, { message: 'El ataque debe ser mayor o igual a 0' })
    ataque: number | null;

    @ApiProperty({ 
        description: 'Puntos de defensa del Pokémon',
        example: 49,
        nullable: true
    })
    @IsOptional()
    @IsInt({ message: 'La defensa debe ser un número entero' })
    @Min(0, { message: 'La defensa debe ser mayor o igual a 0' })
    defensa: number | null;

    @ApiProperty({ 
        description: 'Puntos de ataque especial del Pokémon',
        example: 65,
        nullable: true
    })
    @IsOptional()
    @IsInt({ message: 'El ataque especial debe ser un número entero' })
    @Min(0, { message: 'El ataque especial debe ser mayor o igual a 0' })
    ataqueEspecial: number | null;

    @ApiProperty({ 
        description: 'Puntos de defensa especial del Pokémon',
        example: 65,
        nullable: true
    })
    @IsOptional()
    @IsInt({ message: 'La defensa especial debe ser un número entero' })
    @Min(0, { message: 'La defensa especial debe ser mayor o igual a 0' })
    defensaEspecial: number | null;

    @ApiProperty({ 
        description: 'Puntos de velocidad del Pokémon',
        example: 45,
        nullable: true
    })
    @IsOptional()
    @IsInt({ message: 'La velocidad debe ser un número entero' })
    @Min(0, { message: 'La velocidad debe ser mayor o igual a 0' })
    velocidad: number | null;

    @ApiProperty({ 
        description: 'Tipos del Pokémon',
        type: () => [tipoPokemonEntity],
        isArray: true
    })
    @IsOptional()
    @IsArray()
    tipoPokemon: tipoPokemonEntity[];
  
}
