import { Injectable } from '@nestjs/common';
import { ListaPokemon } from './dto/lista-pokemon.interface';
import { PokemonDetalles } from './dto/pokemon-detalles.interface';
import { PokemonSpecies } from './dto/pokemon-species.interface';

@Injectable()
export class ImportarPokemonesService {

  private readonly BASE_URL = 'https://pokeapi.co/api/v2/'

  async importar() {
    try {

      const resp = await fetch(`${this.BASE_URL}/pokemon?limit=251&offset=0`);
      if (!resp.ok) {
        throw new Error(`Ha ocurrido un error`)
      }

      const pokemones = (await resp.json()) as ListaPokemon;

      const detalles = await Promise.allSettled(
        pokemones.results.map(async ({ url }) => {
          const resp = await fetch(`${url.endsWith("/") ? url.slice(0, -1) : url}`);

          if (!resp.ok) {
            throw new Error(`Ha ocurrido un error al consultar el pokemon: ${url}`)
          }

          const pokemon = (await resp.json()) as PokemonDetalles;

          const { species: { url: speciesUrl } } = pokemon;

          const speciesUrlFixed = speciesUrl.endsWith("/") ? speciesUrl.slice(0, -1) : speciesUrl;

          const speciesApi = await fetch(`${speciesUrlFixed}`);

          if (!speciesApi.ok) {
            throw new Error(`Ha ocurrido un error al cosultar la especie del pokemon: ${pokemon.id}`)
          }

          const especie = (await speciesApi.json()) as PokemonSpecies;

          return { pokemon, especie };
        })
      )

      //const tipos = 
      detalles.filter(i => i.status === "fulfilled").forEach(({ value }) => console.log(value.pokemon.id));

    } catch (error) {

    }

  }
}
