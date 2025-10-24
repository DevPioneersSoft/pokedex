import ButtonCustom from "../../layout/components/ButtonCustom";
import { useEquipo } from "../hooks/useEquipo";
import { useEquipoStore } from "../store/EquipoStore";
import EquipoItem from "./EquipoItem";
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd'

export default function EquipoList() {
  const equipo = useEquipoStore(state => state.equipo);
  const addEquipo = useEquipoStore(state => state.addEquipo);
  const removePokemon = useEquipoStore(state => state.removePokemon);
  const resetEquipo = useEquipoStore(state => state.resetEquipo);
  const { guardarEquipo, isLoading } = useEquipo();


  const onDragEnd = async ({ destination, source }: DropResult<string>) => {
    if (!destination) {
      removePokemon(equipo[source.index].id)
      return;
    }

    const fromIndex = source.index;
    const toIndex = destination.index;

    const equipoClonado = [...equipo];
    const [pokemonMovido] = equipoClonado.splice(fromIndex, 1);
    equipoClonado.splice(toIndex, 0, pokemonMovido);
    addEquipo(equipoClonado)

  }


  return (
    <div className="w-full max-w-md bg-slate-700/60 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-slate-600">
      <h2 className="text-xl font-bold text-amber-300 text-center mb-4">
        Mi equipo Pokémon <span className="text-sm text-slate-300">({equipo.length}/6)</span>
      </h2>
      {isLoading ? (<div>Cargando...</div>) : (


        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dnd-list" direction="vertical">
            {
              (provided) => (
                <ul className="space-y-3 max-h-[700px] overflow-y-auto overflow-x-hidden pr-2 w-full"
                  // className="flex gap-2 p-10 bg-red-100 place-content-center rounded-3xl"
                  ref={provided.innerRef} {...provided.droppableProps}
                >
                  {equipo.length > 0 ? (

                    equipo.map((pokemon, index) => (
                      <Draggable
                        key={pokemon.id}
                        index={index}
                        draggableId={pokemon.id.toString()}
                      >
                        {
                          (provide) => {
                            {
                              return (
                                <div
                                  ref={provide.innerRef}
                                  {...provide.dragHandleProps}
                                  {...provide.draggableProps}
                                  style={{
                                    ...provide.draggableProps.style,
                                    left: 'auto !important',
                                    top: 'auto !important',
                                  }}
                                >
                                  <EquipoItem pokemon={pokemon} />
                                </div>
                              )
                            }
                          }
                        }
                      </Draggable>
                    ))

                  ) : (<li className="text-center text-slate-300 italic py-8">Sin elementos</li>)}
                  {provided.placeholder}
                </ul>
              )
            }
          </Droppable>
        </DragDropContext>

      )}
      <div className="mt-6 flex gap-4 justify-center">
        <ButtonCustom
          label="Guardar equipo"
          color="warning"
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-5 rounded-xl transition shadow-md hover:shadow-lg"
          onClick={() => guardarEquipo.mutate(undefined, {
            onSuccess: () => {

            }
          })}
        />
        <ButtonCustom
          label="Limpiar"
          color="warning"
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-5 rounded-xl transition shadow-md hover:shadow-lg"
          onClick={resetEquipo}
        />
      </div>
    </div>
  )
}


{/* {equipo.length > 0 ? (
            equipo.map((pokemon) => (
              <EquipoItem pokemon={pokemon} />
            ))
          ) : (
            <li className="text-center text-slate-300 italic py-8">Sin elementos</li>
          )} */}