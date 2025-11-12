import { IsArray, IsInt } from "class-validator";

export class FavoritosDto{

    @IsArray()
    @IsInt({each : true})
    pokemonesIds: number[];

    @IsInt()
    usuarioId: number;
}