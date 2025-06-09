import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CategoryTabs, type MovieCategory } from './CategoryTabs';

describe('CategoryTabs', () => {
  const mockOnCategoryChange = vi.fn();

  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  it('renders all category tabs', () => {
    render(
      <CategoryTabs 
        activeCategory="popular" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    expect(screen.getByText('Populares')).toBeInTheDocument();
    expect(screen.getByText('Mejor Calificadas')).toBeInTheDocument();
    expect(screen.getByText('Próximamente')).toBeInTheDocument();
    expect(screen.getByText('En Cartelera')).toBeInTheDocument();
  });

  it('marks active category correctly', () => {
    render(
      <CategoryTabs 
        activeCategory="topRated" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    const activeTab = screen.getByText('Mejor Calificadas');
    expect(activeTab).toHaveClass('category-tabs__tab--active');
  });

  it('calls onCategoryChange when tab is clicked', () => {
    render(
      <CategoryTabs 
        activeCategory="popular" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    fireEvent.click(screen.getByText('Próximamente'));
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('upcoming');
  });

  it('shows correct labels for each category', () => {
    render(
      <CategoryTabs 
        activeCategory="popular" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    const categories: Array<[MovieCategory, string]> = [
      ['popular', 'Populares'],
      ['topRated', 'Mejor Calificadas'],
      ['upcoming', 'Próximamente'],
      ['nowPlaying', 'En Cartelera']
    ];

    categories.forEach(([_, label]) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
}); 