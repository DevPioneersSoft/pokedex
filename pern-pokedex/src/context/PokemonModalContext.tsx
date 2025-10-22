import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Pokemon } from '../features/layout/components/Pokemon';
import type { DetallePokemon } from '../features/pokemonDetalle/componentes/types/detallePokemon.interface';
import { PokemonSimpleModal } from '../features/pokemonDetalle/componentes/modals/PokemonSimpleModal';
import { PokemonDetailModal } from '../features/pokemonDetalle/componentes/modals/PokemonDetailModal';
import { usePokemonDetalle } from '../features/pokemonDetalle/componentes/hooks/usePokemonDetalle';

interface PokemonModalContextType {
  openModal: (pokemon: Pokemon, esFavorito?: boolean, onToggleFavorito?: (pokemon: Pokemon) => void) => void;
  openDetailModal: (pokemon: Pokemon) => void;
  closeModal: () => void;
  closeDetailModal: () => void;
  isOpen: boolean;
  isDetailOpen: boolean;
  selectedPokemon: Pokemon | null;
  pokemonDetalle: DetallePokemon | null | undefined;
  cargandoDetalle: boolean;
}

const PokemonModalContext = createContext<PokemonModalContextType | null>(null);

export function usePokemonModal() {
  const context = useContext(PokemonModalContext);
  if (!context) {
    throw new Error('usePokemonModal debe ser usado dentro de PokemonModalProvider');
  }
  return context;
}

interface PokemonModalProviderProps {
  children: ReactNode;
}

export function PokemonModalProvider({ children }: PokemonModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  
  const { pokemonDetalle, cargandoDetalle } = usePokemonDetalle(
    isDetailOpen && selectedPokemon?.id ? selectedPokemon.id : 0
  );

  const openModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsOpen(true);
  };

  const openDetailModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsOpen(false);
    setIsDetailOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPokemon(null);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <PokemonModalContext.Provider value={{ 
      openModal, 
      openDetailModal, 
      closeModal, 
      closeDetailModal, 
      isOpen, 
      isDetailOpen, 
      selectedPokemon,
      pokemonDetalle,
      cargandoDetalle
    }}>
      {children}
      
      {/* Modal Simple */}
      <PokemonSimpleModal
        opened={isOpen}
        onClose={closeModal}
        pokemon={selectedPokemon}
        onViewDetail={openDetailModal}
      />

      {/* Modal Detallado */}
      <PokemonDetailModal
        opened={isDetailOpen}
        onClose={closeDetailModal}
        pokemon={pokemonDetalle} // Usamos pokemonDetalle en lugar de selectedPokemon
        loading={cargandoDetalle}
      />
    </PokemonModalContext.Provider>
  );
}