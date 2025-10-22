
import { usePokemonDetalle } from '../../ejemploHooks/hooks/usePokemonDetalle';
import { usePokemonFile } from '../../ejemploHooks/hooks/usePokemonFile';
import type { Pokemon, TipoPokemon } from '../../interfaces/Pokemon.interface';

interface ModalPokemonInfoProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const tipoColores: Record<string, string> = {
  planta: 'bg-green-600',
  veneno: 'bg-purple-600',
  fuego: 'bg-orange-500',
  agua: 'bg-blue-500',
  bicho: 'bg-lime-600',
  normal: 'bg-gray-400 text-black',
  eléctrico: 'bg-yellow-400 text-black',
  tierra: 'bg-yellow-800',
  hada: 'bg-pink-300 text-black',
  lucha: 'bg-red-700',
  volador: 'bg-cyan-400',
  psíquico: 'bg-pink-500',
  roca: 'bg-gray-500',
  fantasma: 'bg-purple-700',
  hielo: 'bg-blue-200 text-black',
  dragón: 'bg-indigo-700',
  siniestro: 'bg-gray-900',
  acero: 'bg-gray-400 text-black',
};

const tipoTraduccion: Record<string, string> = {
  grass: 'planta',
  poison: 'veneno',
  fire: 'fuego',
  water: 'agua',
  bug: 'bicho',
  normal: 'normal',
  electric: 'eléctrico',
  ground: 'tierra',
  fairy: 'hada',
  fighting: 'lucha',
  flying: 'volador',
  psychic: 'psíquico',
  rock: 'roca',
  ghost: 'fantasma',
  ice: 'hielo',
  dragon: 'dragón',
  dark: 'siniestro',
  steel: 'acero',
};

const ModalPokemonInfo = ({ pokemon, onClose }: ModalPokemonInfoProps) => {
  const { data: detallePokemon, isLoading, isError } = usePokemonDetalle(pokemon.id);
  
  // Tomar tipos y traducirlos para mas placer
  let tipos: string[] = [];
  if (detallePokemon?.tipoPokemon) {
    tipos = detallePokemon.tipoPokemon.map((tipo: TipoPokemon) => tipoTraduccion[tipo.nombre] || tipo.nombre);
  } else if (pokemon.tipo) {
    tipos = pokemon.tipo;
  }

  const { refetch: descargarFicha, isFetching: descargandoFicha } = usePokemonFile(pokemon.id);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize text-white drop-shadow-lg tracking-wide">{detallePokemon?.nombre || pokemon.nombre}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-400 text-2xl transition-colors"
          >
            ×
          </button>
        </div>
        <img 
          src={detallePokemon?.imagen || pokemon.imagen} 
          alt={detallePokemon?.nombre || pokemon.nombre}
          className="w-48 h-48 mx-auto object-contain mb-4 drop-shadow-xl"
        />
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-gray-700 animate-pulse text-gray-400 shadow cursor-default pointer-events-none"
                  style={{ minWidth: 60, minHeight: 24 }}
                >
                  &nbsp;
                </span>
              ))
            : tipos.map((tipo) => (
                <span
                  key={tipo}
                  className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow ${tipoColores[tipo] || 'bg-gray-700'}`}
                >
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </span>
              ))}
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => descargarFicha()}
            disabled={descargandoFicha}
            className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors flex items-center gap-2 ${descargandoFicha ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {descargandoFicha ? (
              <span className="animate-pulse">Descargando...</span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                Descargar ficha
              </>
            )}
          </button>
        </div>
        <p className="text-gray-300 mb-4 text-justify leading-relaxed">{detallePokemon?.descripcion || pokemon.descripcion}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-700 p-2 rounded text-blue-200">
            <span className="font-semibold">ID:</span> #{(detallePokemon?.id || pokemon.id).toString().padStart(3, '0')}
          </div>
          <div className="bg-gray-700 p-2 rounded text-blue-200">
            <span className="font-semibold">Vida:</span> {detallePokemon?.vida || pokemon.vida}
          </div>
          <div className="bg-gray-700 p-2 rounded text-blue-200">
            <span className="font-semibold">Ataque:</span> {detallePokemon?.ataque || pokemon.ataque}
          </div>
          <div className="bg-gray-700 p-2 rounded text-blue-200">
            <span className="font-semibold">Defensa:</span> {detallePokemon?.defensa || pokemon.defensa}
          </div>
          <div className="bg-gray-700 p-2 rounded text-blue-200">
            <span className="font-semibold">Ataque Esp:</span> {detallePokemon?.ataqueEspecial || pokemon.ataqueEspecial}
          </div>
          <div className="bg-gray-700 p-2 rounded text-blue-200">
            <span className="font-semibold">Defensa Esp:</span> {detallePokemon?.defensaEspecial || pokemon.defensaEspecial}
          </div>
          <div className="bg-gray-700 p-2 rounded col-span-2 text-blue-200">
            <span className="font-semibold">Velocidad:</span> {detallePokemon?.velocidad || pokemon.velocidad}
          </div>
        </div>
        {isLoading && <div className="text-center text-gray-400 mt-4">Cargando detalles...</div>}
        {isError && <div className="text-center text-red-400 mt-4">Error al cargar el detalle.</div>}
      </div>
    </div>
  );
};

export default ModalPokemonInfo;
