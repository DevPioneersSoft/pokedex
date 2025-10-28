import { Injectable } from '@nestjs/common';
import {ListaPokemon} from './dto/lista-pokemon.interface';
import { PokemonDetalles } from './dto/pokemon-detalles.interface';

@Injectable()
export class ImportarPokemonesService {

  private readonly BASE_URL = 'https://pokeapi.co/api/v2'

  async importar() {
    try{

      const resp = await fetch(`${this.BASE_URL}/pokemon?limit=251&offset=0`);
      
      if(!resp.ok){
        throw new Error(`Ha ocurrido un error`)
      }

      const pokemones = (await resp.json()) as ListaPokemon;

      const detalles = await Promise.allSettled(
        pokemones.results.map(async ({url}) => {
          const resp = await fetch(`${url}`);

          if(!resp.ok){
            throw new Error(`Ha ocurrido un error`)
          }

          const pokemon = (await resp.json()) as PokemonDetalles;
        })
      )
    }catch (error){

    }
  }
}
