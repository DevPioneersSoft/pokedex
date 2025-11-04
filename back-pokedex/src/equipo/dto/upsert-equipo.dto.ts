import { PickType } from "@nestjs/swagger";
import { Equipo } from "../entities/equipo.entity";

export class UpsertEquipoDto extends PickType(Equipo, ['pokemonId'] as const) {
}
