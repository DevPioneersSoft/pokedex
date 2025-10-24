import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../shered/api'
import { Pokemon } from '../interfaces/Pokemon.interface'

export function useEquipo() {
    const query = useQuery({
        queryKey: ["equipo"],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 300))
            const response = await api.get<Pokemon[]>("usuario/equipo")
            setEquipo(response.data)
            return response.data
        }
    })

    const registrar = useMutation({
        mutationFn: async () => {
            const response = await api.post('equipo', equipo.map(a => ({ pokemonId: a.id })))
            return response.data
        }
    })

    const eliminarPokemon = (pokemon: Pokemon) => {
        setEquipo(a => a.filter(p => p.id !== pokemon.id))
    }

    const togglePokemon = (pokemon: Pokemon) => {
        if (!equipo.some(a => a.id === pokemon.id)) {
            setEquipo((a) => [
                ...a, pokemon
            ])
        } else {
            setEquipo(a => a.filter(p => p.id !== pokemon.id))
        }
    }

    const limpiarEquipo = () => {
        setEquipo([])
    }

    const [equipo, setEquipo] = useState<Pokemon[]>([])

    return { data: query.data, equipo, registrar, eliminarPokemon, togglePokemon, setEquipo, limpiarEquipo }
}
