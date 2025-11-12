import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ConnectUsuarioDto {

  @ApiProperty()
  @IsNumber()
  id: number;

}