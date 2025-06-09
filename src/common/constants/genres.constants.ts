export interface FavoriteGenre {
  id: number;
  name: string;
  color: string;
  isSelected?: boolean;
}

export interface GenreCategory {
  id: number;
  name: string;
  slug: string;
}

// Los datos mock ahora están en src/mockData/

// Colores predefinidos para nuevos géneros
export const GENRE_COLORS = [
  '#9C27B0', '#FF9800', '#2196F3', '#FF5722', '#00BCD4',
  '#4CAF50', '#F44336', '#E91E63', '#795548', '#673AB7',
  '#3F51B5', '#009688', '#FF6F00', '#8BC34A', '#607D8B'
]; 