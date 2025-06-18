import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonTypeBadge from '../components/commons/PokemonTypeBadge';

describe('PokemonTypeBadge', () => {
  it('should render the type name with correct formatting', () => {
    render(<PokemonTypeBadge type="fire" />);
    
    const badge = screen.getByText('Fire');
    expect(badge).toBeInTheDocument();
  });

  it('should apply correct CSS classes for different types', () => {
    render(<PokemonTypeBadge type="water" />);
    
    const badge = screen.getByText('Water');
    expect(badge).toHaveClass('bg-blue-500');
  });

  it('should handle small size variant', () => {
    render(<PokemonTypeBadge type="grass" size="small" />);
    
    const badge = screen.getByText('Grass');
    expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
  });

  it('should handle unknown type gracefully', () => {
    render(<PokemonTypeBadge type="unknown" />);
    
    const badge = screen.getByText('Unknown');
    expect(badge).toBeInTheDocument();
  });
});
