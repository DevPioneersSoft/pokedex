import { PartialType } from '@nestjs/swagger';
import { CreateFavoritoDto } from './create-favorito.dto';

export class UpdateFavoritoDto extends PartialType(CreateFavoritoDto) {}
