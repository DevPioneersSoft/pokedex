import { IsArray, IsInt } from 'class-validator';

export class FavoritosDto {
  @IsArray()
  @IsInt({ each: true })
  pokemones: number[];

  @IsInt()
  userId: number;
}
