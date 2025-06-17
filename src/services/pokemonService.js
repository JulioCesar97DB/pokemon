const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  async getPokemonList(limit = 20, offset = 0) {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon list');
    }
    return response.json();
  },

  async getPokemonDetails(nameOrId) {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon details for ${nameOrId}`);
    }
    return response.json();
  },

  async getPokemonListWithDetails(limit = 20, offset = 0) {
    const listResponse = await this.getPokemonList(limit, offset);
    
    const pokemonDetailsPromises = listResponse.results.map(pokemon => 
      this.getPokemonDetails(pokemon.name)
    );
    
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    
    const formattedPokemon = pokemonDetails.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      number: pokemon.id,
      image: pokemon.sprites.other.dream_world.front_default || 
              pokemon.sprites.other['official-artwork'].front_default ||
              pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name),
      attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
      defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
      speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
      height: pokemon.height,
      weight: pokemon.weight
    }));

    return {
      pokemon: formattedPokemon,
      total: listResponse.count,
      next: listResponse.next,
      previous: listResponse.previous
    };
  }
};
