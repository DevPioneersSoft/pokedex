import { Flex, Space, Text } from "@mantine/core";
import { useEquipoStore } from "../../store/equipoStore";
import ButtonCustom from "../../layout/components/ButtonCustom";
import CardPokemon from "../../cuadricula/components/CardPokemon";
import {DragDropContext, Draggable, Droppable, type DropResult} from "@hello-pangea/dnd"
import { useRegistrarEquipo } from "../hooks/useRegistrarEquipo";
import { useState } from "react";

export default function ListaEquipo() {
  const { equipoDraft, resetDraft, setDraft, deletePokemon, setEquipo } = useEquipoStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const {mutate} = useRegistrarEquipo();
  const onDragEnd = async({destination, source} : DropResult<string>) =>{
    if(!destination){
      deletePokemon(equipoDraft[source.index].id);
      return;
    }

    const fromIndex = source.index;
    const toIndex = destination.index;
    const equipoClonado = [...equipoDraft];
    const [pokemonMovido] = equipoClonado.splice(fromIndex, 1);
    equipoClonado.splice(toIndex, 0, pokemonMovido);
    setDraft(equipoClonado);
  };

  return (
    <>
    <Space h={20} />
      <Flex align={'center'} justify={'center'} gap={'md'}>
        <Text
          c={'var(--color-info-500)'}
          size={'2rem'}
          fw={700}
          p={6}
        >
          Mi equipo
        </Text>
        <div className="text-2xl text-white font-bold">
          {equipoDraft.length}/6
        </div>
      </Flex>

      <Space h={'lg'} />

      <Flex align={'center'} justify={'center'} ml={60} gap="md">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dnd-list" direction="horizontal">
            {
              (provided) => (
                <div 
                  className="flex gap-2 p-10 bg-blue-100 place-content-center rounded-3xl"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    equipoDraft.map((pokemon, index) => (
                      <Draggable
                        key={pokemon.id}
                        index={index}
                        draggableId={pokemon.id.toString()}
                      >
                        {
                          (provided) => {
                            {
                              return <div style={{ width: '120px', height: '160px' }} className="origin-top"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <CardPokemon pokemon={pokemon}></CardPokemon>
                              </div>;
                            }
                          }
                        }
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </Flex>

      <Space h={20} />

      <Flex justify={'center'} gap={20}>
        <ButtonCustom
          label='Limpiar'
          color='secondary'
          disabled={equipoDraft.length === 0}
          onClick={() => resetDraft()}
        />
        <ButtonCustom
          label='Guardar'
          color='primary'
          onClick={() =>{
            mutate(equipoDraft.map(pokemon => pokemon.id), {
              onSuccess : () =>{
                setIsSuccess(true);
                setEquipo(equipoDraft);
                setTimeout(() => {
                  setIsSuccess(false);
                }, 1000);
              }
            })
          }}
        />
      </Flex>
      {
        isSuccess && <Flex justify={'center'} className="text-xl text-warning-500">
          !Equipo registrado exitosamente!
        </Flex>
      }
    </>
  );
}