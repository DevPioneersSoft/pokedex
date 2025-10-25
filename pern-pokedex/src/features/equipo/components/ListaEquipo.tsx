import { Flex, Space, Text } from "@mantine/core";
import { equipoUserStore } from "../../layout/store/userEquipoStore";
import ButtonCustom from "../../layout/components/ButtonCustom";
import {DragDropContext, Draggable, Droppable, type DropResult} from "@hello-pangea/dnd";
import CardPokemon from "../../cuadricula/components/CardPokemon";
import { useRegistrarEquipo } from "../hooks/useRegistrarEquipo";
import { useState } from "react";

export default function ListaEquipo() {
    const { equipoDraft, resetDraft, setDraft,deletePokemon,setEquipo } = equipoUserStore();

    const {mutate} = useRegistrarEquipo();

    const [isSuccess, setIsSuccess] = useState(false);

    const onDragEnd =  async ({destination, source} : DropResult<string>) =>{
        if(!destination){
            deletePokemon(equipoDraft[source.index].id);
        }
        const fromIndex = source.index;
        const toIndex = destination.index;

        const equipoClonado = [...equipoDraft];

        const [pokemonMovido] = equipoClonado.splice(fromIndex,1);

        equipoClonado.splice(toIndex,0,pokemonMovido);

        setDraft(equipoClonado);
    }
    return (
        <>
            <Flex align={'center'} justify={'center'} gap={'md'}>

                <Text
                    c={'var(--color-warning-600)'}
                    size='2rem'
                    fw={700}
                    p={6}
                    styles={{
                        root: {
                            borderWidth: 2
                        }
                    }}
                >
                    Mi equipo
                </Text>
                <div className="text-2xl text-blue-100 font-bold" >
                    {equipoDraft.length}/6
                </div>
            </Flex>
            <Space w={'lg'} />

            <Flex align={'center'} justify={'center'}>
                <div className="flex gap-2 bg-green-400 place-content-center rounded-3xl">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="dnd-list" direction="horizontal">
                            {
                                (provided) => {
                                    return (
                                        <div
                                        className=" flex gap-2 p-10 bg-green-200 place-content-center rounded-3xl"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                            {
                                                equipoDraft.map((pokemon, index) => (
                                                    <Draggable
                                                        key={pokemon.id.toString()}
                                                        draggableId={pokemon.id.toString()}
                                                        index={index}
                                                    >
                                                        {
                                                            (provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <CardPokemon pokemon={pokemon} />
                                                                </div>
                                                            )
                                                        }
                                                    </Draggable>
                                                ))
                                            }

                                        </div>
                                    )
                                }
                            }
                        </Droppable>
                    </DragDropContext>
                </div>
            </Flex>
            <Space h={20} />
            <Flex align={'center'} gap={20}>
                <ButtonCustom 
                label="Limpiar" 
                color="secondary"
                disabled={equipoDraft.length === 0} 
                onClick={() => resetDraft()} >
                </ButtonCustom>
                <ButtonCustom 
                label="Guardar equipo" 
                color="primary"
                onClick={()=>{
                    mutate(equipoDraft.map(pokemon => pokemon.id),{
                        onSuccess: () => {
                            alert("Equipo guardado correctamente");
                            setIsSuccess(true);
                            setEquipo(equipoDraft);
                            setTimeout(() => setIsSuccess(false), 3000);
                        }
                    });
                }}
                >
                </ButtonCustom>
            </Flex>
            {
                isSuccess && <Flex justify={'center'} className="text-xl text-warning-500">Equipo guardado correctamente</Flex>
            }
        </>
    )
}
