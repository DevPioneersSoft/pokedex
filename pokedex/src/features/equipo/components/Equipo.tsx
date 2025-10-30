import { useEquipo } from "../../ejemploHooks/hooks/useEquipo";
import CardPokemon from "../../layout/components/CardPokemon";
import {DragDropContext, Draggable, Droppable, type DropResult} from "@hello-pangea/dnd";



export default function Equipo() {

  const { equipo, quitarPokemon, maximo, isLoading, error } = useEquipo();
  const onDragEnd = async ({destination, source}: DropResult<string>) => {
    if (!destination) {
      const pokemon = equipo[source.index];
      if (pokemon) quitarPokemon(pokemon.id);
      return;
    }
    if (destination.index === source.index) return;
    equipo.splice(destination.index, 0, equipo.splice(source.index, 1)[0]);
  };

  return (
    <div className="min-h-screen w-full bg-blue-900">
      <h1 className="text-3xl text-center text-white my-6">Mi Equipo Pokémon</h1>
        <div className="flex flex-wrap gap-6 justify-center">
            {isLoading && <p className="text-white/80">Cargando equipo...</p>}
            {error && <p className="text-red-400">Error al cargar pokémon</p>}
            {equipo.length === 0 && !isLoading && (
            <p className="text-white/80">No tienes pokémon en tu equipo.</p>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="equipo" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-wrap gap-6"
                  >
                    {equipo.map((pokemon, index) => (
                      <Draggable key={pokemon.id} draggableId={pokemon.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CardPokemon
                              pokemon={pokemon}
                              enEquipo={true}
                              onAgregarEquipo={() => quitarPokemon(pokemon.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
        </div>
      <div className="text-center mt-6 text-white/80">
        {equipo.length} / {maximo} pokémon en el equipo
      </div>
    </div>
  );
}
