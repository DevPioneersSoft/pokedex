import { Select } from '@mantine/core';
import { useState, useEffect } from 'react';

interface TipoPokemon {
  name: string;
  url: string;
}

interface SelectTipoPokemonProps {
  onTipoChange: (tipo: string | null) => void;
}

export default function SelectTipoPokemon({ onTipoChange }: SelectTipoPokemonProps) {
    const [tipos, setTipos] = useState<string[]>([]);
    const [cargando, setCargando] = useState(true);
  
    const obtenerTipos = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type/');
            const data = await response.json();
            const nombresTipos = data.results.map((tipo: TipoPokemon) => tipo.name);
            setTipos(nombresTipos);
        } catch (error) {
            console.error('Error al obtener tipos:', error);
        } finally {
            setCargando(false);
        }
    };

  useEffect(() => {
    obtenerTipos();
  }, []);

  return (
    <Select
      data={tipos}
      placeholder={cargando ? "Cargando tipos..." : "Selecciona un tipo"}
      disabled={cargando}
      onChange={onTipoChange}
      className="m-4"
    />
  );
}