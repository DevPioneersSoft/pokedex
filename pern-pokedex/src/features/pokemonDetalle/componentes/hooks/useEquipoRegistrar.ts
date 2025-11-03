import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";
import { useUserStore } from "../../../layout/store/userStore";
import type { Pokemon } from "../../../layout/components/Pokemon";

export default function useEquipoRegistrar() {
  const { usuario } = useUserStore();
  
  return useMutation({
    mutationFn: async (pokemonIds: number[]) => {
      if (!usuario || !usuario.id) {
        throw new Error('Usuario no autenticado o sin ID válido');
      }

      const response = await api.post(`/equipo/usuario/${usuario.id}`, { pokemonIds });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Equipo guardado exitosamente:', data);
    }
  });
}

export function useAgregarPokemonEquipo() {
  const { usuario } = useUserStore();
  
  return useMutation<Pokemon[], Error, number>({
    mutationFn: async (pokemonId: number) => {
      if (!usuario || !usuario.id) {
        throw new Error('Usuario no autenticado o sin ID válido');
      }

      const response = await api.post<Pokemon[]>(`/equipo/usuario/${usuario.id}/pokemon`, { pokemonId });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Pokémon agregado al equipo exitosamente:', data);
    }
  });
}

export function useEliminarPokemonEquipo() {
  const { usuario } = useUserStore();
  
  return useMutation<Pokemon[], Error, number>({
    mutationFn: async (pokemonId: number) => {
      if (!usuario || !usuario.id) {
        throw new Error('Usuario no autenticado o sin ID válido');
      }

      const response = await api.delete<Pokemon[]>(`/equipo/usuario/${usuario.id}/pokemon/${pokemonId}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Pokémon eliminado del equipo exitosamente:', data);
    }
  });
}

export function useLimpiarEquipo() {
  const { usuario } = useUserStore();
  
  return useMutation<{ message: string; pokemonRemovidos: number }, Error>({
    mutationFn: async () => {
      if (!usuario || !usuario.id) {
        throw new Error('Usuario no autenticado o sin ID válido');
      }

      const response = await api.delete<{ message: string; pokemonRemovidos: number }>(`/equipo/usuario/${usuario.id}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Equipo limpiado exitosamente:', data);
    }
  });
}