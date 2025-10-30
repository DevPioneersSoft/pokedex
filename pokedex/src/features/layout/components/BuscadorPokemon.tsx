import { useState } from 'react';

interface BuscadorPokemonProps {
  onBuscar: (texto: string) => void;
}

const BuscadorPokemon = ({ onBuscar }: BuscadorPokemonProps) => {
  const [texto, setTexto] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(e.target.value);
    onBuscar(e.target.value);
  };

  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={texto}
        onChange={handleChange}
        placeholder="Buscar por nombre..."
        className="px-4 py-2 rounded w-64 text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default BuscadorPokemon;
