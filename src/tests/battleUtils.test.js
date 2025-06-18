import { describe, it, expect } from 'vitest';
import { battlePokemon } from '../utils/battleUtils';

describe('battleUtils', () => {
  describe('battlePokemon', () => {
    it('should return winner based on speed when first attacker wins', () => {
      const pokemon1 = {
        id: 1,
        name: 'Pikachu',
        speed: 90,
        attack: 55,
        defense: 40
      };
      
      const pokemon2 = {
        id: 2,
        name: 'Bulbasaur',
        speed: 45,
        attack: 49,
        defense: 49
      };

      const result = battlePokemon(pokemon1, pokemon2);

      expect(result.winner).toBe(pokemon1);
      expect(result.winner.name).toBe('Pikachu');
      expect(result.battleLog).toContain('Pikachu ataca primero y debilita a Bulbasaur!');
    });

    it('should handle tie scenarios correctly', () => {
      const pokemon1 = {
        id: 1,
        name: 'Squirtle',
        speed: 43,
        attack: 48,
        defense: 65
      };
      
      const pokemon2 = {
        id: 2,
        name: 'Charmander',
        speed: 43,
        attack: 52,
        defense: 60
      };

      const result = battlePokemon(pokemon1, pokemon2);

      expect(result.winner).toBe(null);
      expect(result.battleLog).toContain('¡La batalla termina en empate!');
    });

    it('should handle missing stats gracefully', () => {
      const pokemon1 = {
        id: 1,
        name: 'TestPokemon1'
      };
      
      const pokemon2 = {
        id: 2,
        name: 'TestPokemon2',
        speed: 50,
        attack: 50,
        defense: 50
      };

      const result = battlePokemon(pokemon1, pokemon2);

      expect(result).toHaveProperty('winner');
      expect(result).toHaveProperty('battleLog');
      expect(Array.isArray(result.battleLog)).toBe(true);
    });
  });
});
