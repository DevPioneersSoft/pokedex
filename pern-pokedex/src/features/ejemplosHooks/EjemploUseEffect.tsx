import { useEffect, useState } from "react"

interface PokemonAPI {
    pokemon: {
        name: string
    }
}

export default function EjemploUseEffect({ tipo }: { tipo: string }) {

    /*const [numeroPokebolas, setNumeroPokebolas] = useState(0)
    const incrementar = () => {
        setNumeroPokebolas(numeroPokebolas + 1)
    }

    useEffect(() => {
        console.log(numeroPokebolas)
    }, [numeroPokebolas]);*/

    const [pokemones, setPokemones] = useState<PokemonAPI[]>([])
    const [cargando, setCargando] = useState(true)

    const buscarPokemonesPorTipo = async () => {
        setCargando(true)
        setTimeout(async () => {
            try {
                const reponse = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
                const data = await reponse.json()
                setPokemones(data.pokemon ?? [])
            } catch (error) {
                console.error("Error buscando pokemon", error)
            } finally {
                setCargando(false)
            }
        }, 1000);
    }

    useEffect(() => {
        buscarPokemonesPorTipo()
    }, [tipo]);


    if (cargando) return <div>Buscando pokemon de tipo {tipo}...</div>

    return (
        <div>
            <h2>Pokemon de tipo {tipo}</h2>
            {
                pokemones.map((pokemon) => (<div className="px-3" key={pokemon.pokemon.name}>
                    {pokemon.pokemon.name}
                </div>))
            }
        </div>
    )
}
