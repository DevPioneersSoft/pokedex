import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entity";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";

export class UsuarioDto extends Usuario{
    
    @ApiProperty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>Pokemon)
    favoritos: Pokemon[]

}
