import { useQuery } from '@tanstack/react-query';
import { pokemonService } from '../services/pokemonService';

export const usePokemonList = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: () => pokemonService.getPokemonListWithDetails(limit, offset),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
  });
};
