import { useEffect, useState } from "react"

interface PokemonAPI{
    pokemon:{
        name:string
    }
}

export default function EjemploUseEffect({tipo}: {tipo:string}) {

   /* const [numeroPokebolas, setNumeroPokebolas] = useState(0)


    const incrementar = () => {
        setNumeroPokebolas(numeroPokebolas + 1)
        console.log(numeroPokebolas)
    }

    useEffect(() => {
        console.log("use effect")
    }, [numeroPokebolas])*/


    const [pokemones, setPokemones] = useState<PokemonAPI[]>([])
    const [cargando, setCargando] = useState(true)


        const buscarPokemonesPorTipo = async () => {
        setCargando(true)

        // Agregar delay antes de hacer la petición
        setTimeout(async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
                const data = await response.json()
                setPokemones(data.pokemon ?? [])
            } catch (error) {
                console.error("No encontró la api", error)
            } finally {
                setCargando(false)
            }
        }, 1000) // 1 segundo de delay
    }
    useEffect(() =>{
        buscarPokemonesPorTipo()
    },[tipo])

    if(cargando) return <div>Buscando Pokemon buscando de tipo {tipo}...</div>

    return (
        <>
           <h2>Pokemon tipo {tipo} </h2>
           {
            pokemones.map((pokemon) => (<div className="p" key={pokemon.pokemon.name}>
                {pokemon.pokemon.name}
            </div>))
           }
        </>
    )
}
