import { ApiProperty } from '@nestjs/swagger';
import { PokemonEntity } from '../entities/pokemon.entity';

export class CreatePokemonDto extends PokemonEntity{  }
