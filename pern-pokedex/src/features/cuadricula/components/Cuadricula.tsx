import { Alert, Button, Center, Grid, Input, Loader } from "@mantine/core";
import { useBuscarPokemones } from "../hooks/useBuscarPokemones";
import { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";

interface CuadriculaProps {
    callback?: (pokemon: Pokemon) => void
    lista: number[]
}

export default function Cuadricula({ callback, lista }: CuadriculaProps) {

    const {
        pokemones,
        isLoading,
        refetch,
        isFetching,
        nextPage,
        prevPage,
        searchPokemones,
        page,
        totalPages
    } = useBuscarPokemones({ initialPageSize: 18 })

    return (
        <>
            <Grid>
                <Grid.Col span={2}>
                    <Button fullWidth color="yellow" onClick={() => refetch()}>Refrescar lista</Button>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Input placeholder="Búsqueda por ID/Nombre" onKeyUp={(e) => searchPokemones(e.currentTarget.value)} />
                </Grid.Col>
                <Grid.Col span={2}>
                    <span className="text-white font-bold">Página {page} de {totalPages}</span>
                </Grid.Col>
                <Grid.Col span={1} offset={2}>
                    <Button fullWidth color="yellow" onClick={() => prevPage()}>{`<`}</Button>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button fullWidth color="yellow" onClick={() => nextPage()}>{`>`}</Button>
                </Grid.Col>
            </Grid>
            <Grid className="mt-4">
                {(isLoading || isFetching) ?
                    (
                        <Grid.Col span={6} offset={3}>
                            <Alert variant="light" color="yellow" radius="md" title="Cargando Pokemones">
                                <Center>
                                    <Loader size={"xl"} type="dots" color="yellow" />
                                </Center>
                            </Alert>
                        </Grid.Col>
                    ) : (
                        pokemones?.map(pokemon => <Grid.Col span={2} key={pokemon.id}
                            children={<CardPokemon pokemon={pokemon} callback={callback} selected={lista.includes(pokemon.id)} />}
                        />)
                    )
                }
            </Grid>
        </>
    )
}
