import type {
  FavoriteGenre,
  GenreCategory,
} from "../common/constants/genres.constants";

// Datos simulados que vendrían de una API real
export const MOCK_FAVORITE_GENRES: FavoriteGenre[] = [
  { id: 1, name: "Action", color: "#9C27B0", isSelected: true },
  { id: 2, name: "Western", color: "#FF9800", isSelected: true },
  { id: 3, name: "Adventure", color: "#2196F3", isSelected: true },
  { id: 4, name: "Drama", color: "#FF5722", isSelected: true },
  { id: 5, name: "Sci-Fi", color: "#00BCD4", isSelected: true },
  { id: 6, name: "Comedy", color: "#4CAF50", isSelected: false },
  { id: 7, name: "Horror", color: "#F44336", isSelected: false },
  { id: 8, name: "Romance", color: "#E91E63", isSelected: false },
  { id: 9, name: "Thriller", color: "#795548", isSelected: false },
  { id: 10, name: "Fantasy", color: "#673AB7", isSelected: false },
];

export const MOCK_GENRE_CATEGORIES: GenreCategory[] = [
  { id: 1, name: "Crime", slug: "crime" },
  { id: 2, name: "Comedy", slug: "comedy" },
  { id: 3, name: "Thriller", slug: "thriller" },
  { id: 4, name: "Mystery", slug: "mystery" },
  { id: 5, name: "Family", slug: "family" },
  { id: 6, name: "Animation", slug: "animation" },
];

// Datos para el dropdown de ordenamiento
export interface SortOption {
  id: string;
  label: string;
  value: string;
}

export const MOCK_SORT_OPTIONS: SortOption[] = [
  { id: "today", label: "Today", value: "today" },
  { id: "week", label: "This Week", value: "week" },
  { id: "month", label: "This Month", value: "month" },
  { id: "year", label: "This Year", value: "year" },
];

// Configuración de latencias para simular API
export const MOCK_API_DELAYS = {
  favorites: 300,
  categories: 150,
  allGenres: 200,
  mutations: {
    add: 400,
    remove: 300,
    create: 500,
  },
} as const;

// Configuración de errores simulados (probabilidades)
export const MOCK_ERROR_RATES = {
  favorites: 0.05, // 5% de probabilidad de error
  categories: 0.02, // 2% de probabilidad de error
  allGenres: 0.03, // 3% de probabilidad de error
  mutations: 0.01, // 1% de probabilidad de error
} as const;
