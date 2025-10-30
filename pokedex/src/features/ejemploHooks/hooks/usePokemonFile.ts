import { useQuery } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_API_URL;

export function usePokemonFile(id: number) {
  return useQuery({
    queryKey: ['pokemonFile', id],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/pokemon/${id}/ficha`, { credentials: 'include' });
      if (!response.ok) throw new Error('No se pudo obtener la ficha del pokemon');
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = `pokemon-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(urlBlob);
    },
    enabled: false,
  });
}
