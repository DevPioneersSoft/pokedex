import { IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  username: string;

  @IsString()
  contrasena: string;
}
