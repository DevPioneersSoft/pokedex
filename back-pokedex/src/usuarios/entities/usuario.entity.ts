import { Usuario } from "generated/prisma/client";
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, MinLength, MaxLength, IsDate, Min } from 'class-validator';

export class UsuarioEntity implements Usuario {
  @ApiProperty({
    description: 'ID único del usuario',
    example: 1
  })
  @IsInt({ message: 'El ID debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID es requerido' })
  @Min(1, { message: 'El ID debe ser mayor a 0' })
  id: number;

  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'ash_ketchum',
    minLength: 3,
    maxLength: 100
  })
  @IsString({ message: 'El username debe ser un texto' })
  @IsNotEmpty({ message: 'El username es requerido' })
  @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El username no puede exceder los 100 caracteres' })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'EJEMPLO_PASSWORD',
    minLength: 6
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2025-10-29T12:00:00.000Z'
  })
  @IsDate({ message: 'createdAt debe ser una fecha válida' })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del usuario',
    example: '2025-10-29T12:00:00.000Z'
  })
  @IsDate({ message: 'updatedAt debe ser una fecha válida' })
  updatedAt: Date;
}   
