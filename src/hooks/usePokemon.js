import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokemonService } from '../services/pokemonService';

export const usePokemonList = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: () => pokemonService.getPokemonListWithDetails(limit, offset),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10, 
  });
};

export const usePokemonDetails = (nameOrId) => {
  return useQuery({
    queryKey: ['pokemon', 'details', nameOrId],
    queryFn: () => pokemonService.getPokemonDetails(nameOrId),
    enabled: !!nameOrId,
    staleTime: 1000 * 60 * 10, 
    cacheTime: 1000 * 60 * 30, 
  });
};

export const usePokemonInfinite = (limit = 20) => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => 
      pokemonService.getPokemonListWithDetails(limit, pageParam),    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return parseInt(url.searchParams.get('offset'));
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
  });
};
