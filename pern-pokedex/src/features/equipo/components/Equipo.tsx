import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Alert, Button, Grid } from "@mantine/core";
import CardPokemon from "../../cuadricula/components/CardPokemon";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import { useEquipo } from "../../cuadricula/hooks/useEquipo";
import { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";

export default function Equipo() {
    const { equipo, eliminarPokemon, togglePokemon, setEquipo, registrar, limpiarEquipo } = useEquipo()

    const onDragEnd = async ({ destination, source }: DropResult<string>) => {
        if (!destination) {
            eliminarPokemon(equipo[source.index])
            return
        }

        const fromIndex = source.index
        const toIndex = destination.index
        const equipoClonado = [...equipo]
        const [pokemonMovido] = equipoClonado.splice(fromIndex, 1)
        equipoClonado.splice(toIndex, 0, pokemonMovido)
        setEquipo(equipoClonado)
    }

    const handleAgregarPokemon = (pokemon: Pokemon) => {
        if (equipo.length < 6) {
            togglePokemon(pokemon)
        } else {
            eliminarPokemon(pokemon)
        }
    }

    return (
        <>
            <Grid>
                <Grid.Col span={6} offset={3}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="dnd-list" direction="horizontal">
                            {
                                (provide) => (
                                    <Alert variant="light" color="yellow" radius="md" title={equipo.length === 0 && 'No tienes Pokemones en tu equipo'} style={{ minHeight: '245px' }} ref={provide.innerRef} {...provide.droppableProps}>
                                        <Grid>
                                            {
                                                equipo.map((pokemon, index) => (
                                                    <Draggable key={pokemon.id}
                                                        index={index}
                                                        draggableId={pokemon.id.toString()}
                                                    >
                                                        {
                                                            (provided) => {
                                                                {
                                                                    return (
                                                                        <Grid.Col onClick={() => eliminarPokemon(pokemon)} span={2}
                                                                            key={pokemon.id}
                                                                            ref={provided.innerRef}
                                                                            {...provided.dragHandleProps}
                                                                            {...provided.draggableProps}
                                                                            children={<CardPokemon pokemon={pokemon} selected={true} />}
                                                                        />
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    </Draggable>
                                                ))
                                            }
                                        </Grid>
                                    </Alert>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={1} offset={7}>
                    <Button fullWidth color="red" onClick={() => limpiarEquipo()}>Limpiar</Button>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button fullWidth color="green" onClick={() => registrar.mutateAsync()}>Guardar</Button>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={6} offset={3}>
                    <Cuadricula callback={pokemon => handleAgregarPokemon(pokemon)} lista={equipo.map(a => a.id)} />
                </Grid.Col>
            </Grid>
        </>
    )
}
