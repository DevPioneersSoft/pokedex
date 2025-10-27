import { Flex, Text, Space} from "@mantine/core"
import { useEquipoStore } from "../../layout/store/equipoStore"
import ButtonCustom from "../../layout/components/ButtonCustom"
import CardPokemon from "../../cuadricula/components/CardPokemon"
import {DragDropContext, Draggable, Droppable, type DropResult} from "@hello-pangea/dnd"
import { useRegistrarEquipo } from "../hooks/useRegistrarEquipo"
import { useState } from "react"
export default function ListaEquipo(){

    const {equipoDraft, resetDraft, setDraft, setEquipo} = useEquipoStore()

    const {mutate} = useRegistrarEquipo()

    const [isSuccess, setIsSuccess] = useState(false)

    const onDragEnd = async({destination, source}: DropResult<string>) =>{

        if(!destination){
            return
        }

        const fromIndex = source.index
        const toIndex = destination.index

        const equipoClonado = [...equipoDraft]

        const [pokemonMovido] = equipoClonado.splice(fromIndex, 1)

        equipoClonado.splice(toIndex, 0, pokemonMovido)

        setDraft(equipoClonado)

    }

    return ( 
        <>
            <Flex align={'center'} justify={'center'} gap={'md'}>
                <Text
                    c={'var(--color-warning-500)'}
                    size='2rem'
                    fw={700}
                    p={6}
                    styles={
                        {
                            root:{
                                borderWidth:2,
                            }
                        }
                    }
                >
                    Mi equipo
                </Text>
                <div className='text-2x1 text-white font-bold'>
                    {equipoDraft.length}/6
                </div>
            </Flex>
            <Space h={'lg'}/>
            {/*<Flex justify={'center'} gap={20}>
                <div className="bg-red-300 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] rounded-2xl p-10 ">
                    {
                        equipoDraft.map((pokemon,index) => {
                            return (
                                <div key={index} >
                                    <CardPokemon pokemon={pokemon} selected={false}/>
                                </div>
                            )
                        })
                    }
                </div>
            </Flex>*/}
            <Flex justify={'center'} gap={20}>
            
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dnd-list" direction="horizontal">
                    {
                        (provide) => (
                            <div className="flex gap-2 p-10 bg-red-100 place-content-center rounded-3x1"
                                ref={provide.innerRef}
                                {...provide.droppableProps}
                            >
                                {
                                    equipoDraft.map((pokemon,index)=>(
                                        <Draggable
                                        key={pokemon.id}
                                        index={index}
                                        draggableId={pokemon.id.toString()}>
                                            {
                                                (provided) => {
                                                    {    
                                                        return(
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                        >
                                                            <CardPokemon pokemon={pokemon} selected={false}/>
                                                        </div>
                                                        )}                                               
                                                }

                                            }
                                        </Draggable>
                                    ))
                                }
                                {provide.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>

            </Flex>
            <Space h={'lg'}/>
            <Flex justify={'center'} gap={20}>
                <ButtonCustom
                    label="Limpiar"
                    color="secondary"
                    disabled={equipoDraft.length===0}
                    onClick={()=>resetDraft()}
                />
                <ButtonCustom
                    label="Guardar"
                    color="primary"
                    onClick={() => {
                        mutate(equipoDraft.map(pokemon => pokemon.id),{
                            onSuccess:() => {
                                setIsSuccess(true)
                                setEquipo(equipoDraft)
                                setTimeout(() => {
                                    setIsSuccess(false)
                                }, 1000)
                            }
                        })
                    }}
                />
            </Flex>

            {
                isSuccess && <Flex justify={'center'} className="text-xl text-warning-500">
                    Equipazo que te armaste mirrey
                </Flex>
            }
        </>
    )
}