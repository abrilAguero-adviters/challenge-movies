import {
  MOCK_API_DELAYS,
  MOCK_ERROR_RATES,
  MOCK_FAVORITE_GENRES,
  MOCK_GENRE_CATEGORIES,
} from "../__mock__/genres";
import type {
  FavoriteGenre,
  GenreCategory,
} from "../common/constants/genres.constants";
import { GENRE_COLORS } from "../common/constants/genres.constants";

// Simular latencia de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const genresService = {
  // Obtener géneros favoritos del usuario
  getFavoriteGenres: async (): Promise<FavoriteGenre[]> => {
    await delay(MOCK_API_DELAYS.favorites);

    // Simular posible error de red
    if (Math.random() < MOCK_ERROR_RATES.favorites) {
      throw new Error("Error de conexión al obtener géneros favoritos");
    }

    // Filtrar solo los géneros seleccionados
    return MOCK_FAVORITE_GENRES.filter(
      (genre: FavoriteGenre) => genre.isSelected
    );
  },

  // Obtener todos los géneros disponibles
  getAllGenres: async (): Promise<FavoriteGenre[]> => {
    await delay(MOCK_API_DELAYS.allGenres);

    if (Math.random() < MOCK_ERROR_RATES.allGenres) {
      throw new Error("Error al obtener la lista de géneros");
    }

    return MOCK_FAVORITE_GENRES;
  },

  // Obtener categorías de géneros
  getGenreCategories: async (): Promise<GenreCategory[]> => {
    await delay(MOCK_API_DELAYS.categories);

    if (Math.random() < MOCK_ERROR_RATES.categories) {
      throw new Error("Error al obtener categorías de géneros");
    }

    return MOCK_GENRE_CATEGORIES;
  },

  // Agregar género a favoritos
  addToFavorites: async (genreId: number): Promise<FavoriteGenre> => {
    await delay(MOCK_API_DELAYS.mutations.add);

    const genre = MOCK_FAVORITE_GENRES.find(
      (g: FavoriteGenre) => g.id === genreId
    );
    if (!genre) {
      throw new Error("Género no encontrado");
    }

    // Simular actualización en el servidor
    const updatedGenre = { ...genre, isSelected: true };

    // En una app real, aquí se haría la petición al servidor
    console.log(`Género "${genre.name}" agregado a favoritos`);

    return updatedGenre;
  },

  // Remover género de favoritos
  removeFromFavorites: async (
    genreId: number
  ): Promise<{ success: boolean }> => {
    await delay(MOCK_API_DELAYS.mutations.remove);

    const genre = MOCK_FAVORITE_GENRES.find(
      (g: FavoriteGenre) => g.id === genreId
    );
    if (!genre) {
      throw new Error("Género no encontrado");
    }

    console.log(`Género "${genre.name}" removido de favoritos`);

    return { success: true };
  },

  // Crear nuevo género personalizado
  createCustomGenre: async (name: string): Promise<FavoriteGenre> => {
    await delay(MOCK_API_DELAYS.mutations.create);

    if (!name.trim()) {
      throw new Error("El nombre del género es requerido");
    }

    // Verificar si ya existe
    const existingGenre = MOCK_FAVORITE_GENRES.find(
      (g: FavoriteGenre) => g.name.toLowerCase() === name.toLowerCase()
    );

    if (existingGenre) {
      throw new Error("Este género ya existe");
    }

    // Crear nuevo género con color aleatorio
    const randomColor =
      GENRE_COLORS[Math.floor(Math.random() * GENRE_COLORS.length)];
    const newGenre: FavoriteGenre = {
      id: Date.now(), // En una app real vendría del servidor
      name: name.trim(),
      color: randomColor,
      isSelected: true,
    };

    console.log(`Nuevo género "${name}" creado`);

    return newGenre;
  },
};

// Tipos para las respuestas de la API (para futuro uso)
export interface GenresApiResponse {
  data: FavoriteGenre[];
  total: number;
  page: number;
  limit: number;
}

export interface GenreActionResponse {
  success: boolean;
  message: string;
  data?: FavoriteGenre;
}
