// import {pokemonDummies} from "./pokemon.dummy";
// import CardPokemon from './CardPokemon';
import React, { useEffect, useState } from 'react'

import { useBuscarPokemones } from "../../ejemplosHooks/hooks/useBuscarPokemonesHooks"
import CardPokemon from './CardPokemon';
import type { Pokemon } from '../../interfaces/Pokemon.interface';

interface CuadriculaProps{
  callback?: (pokemon: Pokemon) => void

}

export default function cuadricula({callback} : CuadriculaProps) {
  const {pokemones, isLoading, refetch, isFetching, nextPage, prevPage, searchPokemons } = useBuscarPokemones({});
  if(isLoading) return <div className='text-center'>...CARGANDO...</div>
  if(isFetching) return <div className='text-center'>...CARGANDO...</div>
  return (
    <>
      <button className="bg-amber-400" onClick={() => {refetch()}}>REFRESCAR</button>
      <input  type="text" onChange={(e) => searchPokemons(e.target.value)} placeholder='Escribe algo' className='bg-white'></input>
      <div>
        <div
        className='grid 
        gap-3 
        [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))]
        rounded-2xl 
        p-6'>
          {
          pokemones?.map((pokemon, index) => (
            <CardPokemon 
              key={index}
              pokemon={pokemon}
              callback={callback}
            />
          ))
          }
        </ div>
        <div className='text-center'>
          <button className="bg-primary-300 px-5 border-1 rounded-2xl" onClick={() => {prevPage()}}>Página Anterior</button>
          <button className="bg-secondary-300 px-5 border-1 rounded-2xl" onClick={() => {nextPage()} }>Página Siguiente</button>
        </div>
      </div>
    </>
  )
}
