import { OmitType } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entity";

export class CreateUsuarioDto extends OmitType(Usuario, ['id'] as const) { }
