import { PartialType } from '@nestjs/swagger';
import { CreateAutenticationDto } from './create-autentication.dto';

export class UpdateAutenticationDto extends PartialType(CreateAutenticationDto) {}
