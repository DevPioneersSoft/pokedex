import { PartialType } from '@nestjs/swagger';
import { CreateAutenticacionDto } from './create-autenticacion.dto';

export class UpdateAutenticacionDto extends PartialType(CreateAutenticacionDto) {}
