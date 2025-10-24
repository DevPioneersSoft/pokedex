import { Grid } from "@mantine/core";
import { useState } from "react";
import PokemonPreview from "../../pokemonDetalles/components/PokemonPreview";
import { useFavoritos } from "../hooks/useFavoritos";
import { Pokemon } from "../interfaces/Pokemon.interface";
import Cuadricula from "./Cuadricula";

export default function Pokedex() {
    const { favoritos, toggleFav, agregar } = useFavoritos()
    const [preview, setPreview] = useState<Pokemon | null>(null)
    const handleFav = (pokemon: Pokemon) => {
        toggleFav(pokemon)
        agregar.mutateAsync()
    }

    return (
        <Grid>
            <Grid.Col span={6}>
                <Cuadricula callback={pokemon => setPreview(pokemon)} lista={favoritos} />
            </Grid.Col>
            <Grid.Col span={6}>
                {preview && <PokemonPreview pokemon={preview} favorito={favoritos.includes(preview.id)} handleFav={() => handleFav(preview)} />}
            </Grid.Col>
        </Grid>
    )
}
