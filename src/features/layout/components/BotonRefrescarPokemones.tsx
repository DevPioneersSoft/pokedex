import { useState } from 'react';

const RefrescarPokemonesButton = ({ onRefrescando }: { onRefrescando: () => Promise<void> }) => {
  const [recargando, setRecargando] = useState(false);

  const handleRefrescar = async () => {
    setRecargando(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await onRefrescando();
    setRecargando(false);
  };

  return (
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
      onClick={handleRefrescar}
      disabled={recargando}
    >
      {recargando ? 'Recargando pokemones...' : 'Refrescar Pokemones'}
    </button>
  );
};

export default RefrescarPokemonesButton;