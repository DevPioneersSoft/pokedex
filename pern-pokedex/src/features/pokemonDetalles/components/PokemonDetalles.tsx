
import { Button } from "@mantine/core";
import { usePokemonFile } from "../hooks/usePokemonFile";
import type { PokemonDetalle } from "../types/detallePokemon.interface";
import PokemonTypes from "./PokemonTypes";


interface PokemonDetallesProps {
    pokemon: PokemonDetalle
}

export default function PokemonDetalles({ pokemon }: PokemonDetallesProps) {

    const {
        imagen,
        id,
        grunido,
        nombre,
        descripcion,
        tipoPokemon,
        vida,
        ataque,
        defensa,
        velocidad,
        ataqueEspecial,
        defensaEspecial,
        ...stats
    } = pokemon

    const { refetch, isFetching } = usePokemonFile(pokemon.id)

    return (
        <div className="relative flex flex-col md:flex-row items-center p-8 rounded-3xl border border-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute inset-0" />
            </div>
            <div className="flex flex-col items-center text-center md:w-1/2 z-10">
                <div className="absolute inset-0 z-0">
                    <img src={imagen} alt={`${nombre} background`} className="w-full h-full object-contain opacity-10 scale-125 grayscale" />
                </div>
                <div className="relative">
                    <img
                        src={imagen}
                        alt={nombre}
                        className="w-48 h-48 object-contain rounded-2xl bg-white shadow-md border border-white"
                    />
                    <span className="absolute top-2 right-2 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                        #{String(id).padStart(3, "0")}
                    </span>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-wide text-gray-800 drop-shadow-sm">
                    {nombre.toUpperCase()}
                </h2>

                <PokemonTypes types={tipoPokemon.map((t) => t.nombre)} />
            </div>

            <div className="md:w-1/2 flex flex-col gap-5 z-10 w-full">
                <div className="flex flex-col gap-3 w-full">
                    <StatItem color="red" label="HP" value={vida} icon="❤️" />
                    <StatItem color="yellow" label="Velocidad" value={velocidad} icon="⚡" />
                    <StatItem color="orange" label="Ataque" value={`${ataque} / ✨ ${ataqueEspecial}`} icon="⚔️" />
                    <StatItem color="blue" label="Defensa" value={`${defensa} / ✨ ${defensaEspecial}`} icon="🛡️" />
                </div>

                <p className="text-gray-700 text-sm leading-relaxed text-justify p-4 rounded-xl">
                    {descripcion}
                </p>

                <audio controls>
                    <source src={grunido} type="audio/mpeg" />
                    Tu navegador no soporta audio.
                </audio>

                <Button onClick={() => refetch()} disabled={isFetching} fullWidth
                > {isFetching ? "Descargando..." : "Descargar archivo"} </Button>
            </div>
        </div>
    )

}

function StatItem({ color, label, value, icon, }: { color: string, label: string, value: string | number, icon?: string }) {
    const colors: Record<string, string> = {
        red: "bg-red-100 border-red-300 text-red-700",
        orange: "bg-orange-100 border-orange-300 text-orange-700",
        blue: "bg-blue-100 border-blue-300 text-blue-700",
        yellow: "bg-yellow-100 border-yellow-300 text-yellow-700",
    }

    return (
        <div className={`flex justify-between items-center w-full px-4 py-2 border rounded-xl shadow-sm font-medium ${colors[color]}`}>
            <span className="flex items-center gap-2 text-lg"> {icon} {label} </span>
            <span className="font-bold">{value}</span>
        </div>
    )
}