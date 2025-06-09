import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { genresService } from "../../services/genresService";
import type { FavoriteGenre } from "../constants/genres.constants";

// Query keys para React Query
export const GENRES_QUERY_KEYS = {
  all: ["genres"] as const,
  favorites: () => [...GENRES_QUERY_KEYS.all, "favorites"] as const,
  categories: () => [...GENRES_QUERY_KEYS.all, "categories"] as const,
  allGenres: () => [...GENRES_QUERY_KEYS.all, "all"] as const,
} as const;

// Hook para obtener géneros favoritos
export const useFavoriteGenresQuery = () => {
  return useQuery({
    queryKey: GENRES_QUERY_KEYS.favorites(),
    queryFn: genresService.getFavoriteGenres,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para obtener todos los géneros disponibles
export const useAllGenresQuery = () => {
  return useQuery({
    queryKey: GENRES_QUERY_KEYS.allGenres(),
    queryFn: genresService.getAllGenres,
    staleTime: 10 * 60 * 1000, // 10 minutos (datos más estables)
    gcTime: 15 * 60 * 1000, // 15 minutos
  });
};

// Hook para obtener categorías de géneros
export const useGenreCategoriesQuery = () => {
  return useQuery({
    queryKey: GENRES_QUERY_KEYS.categories(),
    queryFn: genresService.getGenreCategories,
    staleTime: 15 * 60 * 1000, // 15 minutos (datos muy estables)
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

// Hook para agregar género a favoritos
export const useAddToFavoritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: genresService.addToFavorites,
    onSuccess: (newGenre) => {
      // Actualizar la caché de géneros favoritos
      queryClient.setQueryData<FavoriteGenre[]>(
        GENRES_QUERY_KEYS.favorites(),
        (oldData) => {
          if (!oldData) return [newGenre];

          // Verificar si ya existe
          const exists = oldData.some((genre) => genre.id === newGenre.id);
          if (exists) return oldData;

          return [...oldData, newGenre];
        }
      );

      // Invalidar queries relacionadas para refetch
      queryClient.invalidateQueries({
        queryKey: GENRES_QUERY_KEYS.allGenres(),
      });

      console.log(
        `Género "${newGenre.name}" agregado a favoritos exitosamente`
      );
    },
    onError: (error) => {
      console.error("Error al agregar género a favoritos:", error);
    },
  });
};

// Hook para remover género de favoritos
export const useRemoveFromFavoritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: genresService.removeFromFavorites,
    onSuccess: (_, genreId) => {
      // Actualizar la caché removiendo el género
      queryClient.setQueryData<FavoriteGenre[]>(
        GENRES_QUERY_KEYS.favorites(),
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((genre) => genre.id !== genreId);
        }
      );

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({
        queryKey: GENRES_QUERY_KEYS.allGenres(),
      });

      console.log("Género removido de favoritos exitosamente");
    },
    onError: (error) => {
      console.error("Error al remover género de favoritos:", error);
    },
  });
};

// Hook para crear nuevo género personalizado
export const useCreateCustomGenreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: genresService.createCustomGenre,
    onSuccess: (newGenre) => {
      // Agregar a la caché de favoritos
      queryClient.setQueryData<FavoriteGenre[]>(
        GENRES_QUERY_KEYS.favorites(),
        (oldData) => {
          if (!oldData) return [newGenre];
          return [...oldData, newGenre];
        }
      );

      // Agregar a la caché de todos los géneros
      queryClient.setQueryData<FavoriteGenre[]>(
        GENRES_QUERY_KEYS.allGenres(),
        (oldData) => {
          if (!oldData) return [newGenre];
          return [...oldData, newGenre];
        }
      );

      console.log(
        `Nuevo género personalizado "${newGenre.name}" creado exitosamente`
      );
    },
    onError: (error) => {
      console.error("Error al crear género personalizado:", error);
    },
  });
};

// Hook compuesto para facilitar el manejo de géneros en componentes
export const useGenresManagement = () => {
  const favoritesQuery = useFavoriteGenresQuery();
  const categoriesQuery = useGenreCategoriesQuery();
  const addToFavoritesMutation = useAddToFavoritesMutation();
  const removeFromFavoritesMutation = useRemoveFromFavoritesMutation();
  const createCustomGenreMutation = useCreateCustomGenreMutation();

  return {
    // Datos
    favoriteGenres: favoritesQuery.data || [],
    genreCategories: categoriesQuery.data || [],

    // Estados de carga
    isLoadingFavorites: favoritesQuery.isLoading,
    isLoadingCategories: categoriesQuery.isLoading,

    // Estados de error
    favoritesError: favoritesQuery.error,
    categoriesError: categoriesQuery.error,

    // Acciones
    addToFavorites: addToFavoritesMutation.mutate,
    removeFromFavorites: removeFromFavoritesMutation.mutate,
    createCustomGenre: createCustomGenreMutation.mutate,

    // Estados de mutaciones
    isAddingToFavorites: addToFavoritesMutation.isPending,
    isRemovingFromFavorites: removeFromFavoritesMutation.isPending,
    isCreatingCustomGenre: createCustomGenreMutation.isPending,
  };
};
