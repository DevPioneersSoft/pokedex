import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AutenticarUsuarioDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'ash_ketchum'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'miContraseña123'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;
}