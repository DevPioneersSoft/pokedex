import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ConnectPokemonDto {

  @ApiProperty()
  @IsNumber()
  id: number;
  
}