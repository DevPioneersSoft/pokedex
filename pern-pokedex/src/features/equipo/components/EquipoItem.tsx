import React from 'react'
import type { Pokemon } from '../../cuadricula/interfaces/Pokemon.interface'
import { useEquipoStore } from '../store/EquipoStore';

type EquipoItemProps = {
    pokemon: Pokemon
}

export default function EquipoItem({ pokemon }: EquipoItemProps) {
    const { id, imagen, nombre } = pokemon;
    const removePokemon = useEquipoStore(state => state.removePokemon);

    return (
        <li
            key={id}
            className="flex justify-between items-center bg-slate-800/70 hover:bg-slate-700 transition-all border border-slate-600 rounded-xl p-2 shadow-sm"
        >
            <div className="flex items-center gap-3">
                <img
                    className="w-16 h-16 object-contain bg-slate-900/50 rounded-lg p-1"
                    src={imagen}
                    alt={nombre}
                />
                <h2 className="font-semibold text-amber-100 capitalize">{nombre}</h2>
            </div>
            <button
                onClick={() => removePokemon(id)}
                className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center transition"
            >
                ×
            </button>
        </li>
    )
}
