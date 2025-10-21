import React, { useEffect, useState } from 'react'

interface PokemonAPI {
    pokemon: {
        name: string
    }
}

export default function EjemploUseEffect({tipo}: {tipo:string}) {
    // const [numeroPokebolas, setNumeroPokembolas] = useState(0);

    // const incrementar = () => {
    //     setNumeroPokembolas(numeroPokebolas + 1)
    // }
    // useEffect(()=>{

    // }, [])

    const [pokemones, setPokemones] = useState<PokemonAPI[]>([])
    const [cargando, setCargando] = useState(true)

    const buscarPokemonesPorTipo = async () => {
        setCargando(true)
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
            const data = await response.json()
            setPokemones(data.pokemon ?? [])
        } catch (error) {
            console.error("Error buscando pokemones del API", error)
        }finally{
            setCargando(false)
        }
    }

    useEffect(() => {
        buscarPokemonesPorTipo()
    }, [tipo])

    if(cargando) return <div>Buscando pokemon de tipo {tipo}...</div>

  return (
    <div>
        <h2>POKEMON DE TIPO {tipo}</h2>
        {
            pokemones.map((pokemon) => (<div className='px-3' key={pokemon.pokemon.name}>{pokemon.pokemon.name}</div>))
        }
    </div>
  )
}
