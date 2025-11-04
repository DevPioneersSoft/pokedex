import { OmitType } from '@nestjs/swagger';
import { UsuarioEntity } from '../entities/usuario.entity';

const AUTO_GENERATED_FIELDS = ['id', 'createdAt', 'updatedAt'] as const;

export class CreateUsuarioDto extends OmitType(
  UsuarioEntity,
  AUTO_GENERATED_FIELDS
) {}
