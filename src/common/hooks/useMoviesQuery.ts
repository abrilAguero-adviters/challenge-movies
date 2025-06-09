import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../../services/tmdbService";
import type { Movie } from "../types/movie";

export type MovieCategory = "popular" | "upcoming" | "nowPlaying" | "topRated";

interface UseMoviesQueryOptions {
  enabled?: boolean;
  page?: number;
}

export const useMoviesQuery = (
  category: MovieCategory,
  options: UseMoviesQueryOptions = {}
) => {
  const { enabled = true, page = 1 } = options;

  return useQuery({
    queryKey: ["movies", category, page],
    queryFn: async (): Promise<Movie[]> => {
      switch (category) {
        case "popular":
          const popularResponse = await tmdbService.getPopularMovies(page);
          return popularResponse.results;
        case "upcoming":
          const upcomingResponse = await tmdbService.getUpcomingMovies(page);
          return upcomingResponse.results;
        case "nowPlaying":
          const nowPlayingResponse = await tmdbService.getNowPlayingMovies(
            page
          );
          return nowPlayingResponse.results;
        case "topRated":
          const topRatedResponse = await tmdbService.getTopRatedMovies(page);
          return topRatedResponse.results;
        default:
          throw new Error(`Categoría no válida: ${category}`);
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook específico para obtener detalles de una película
export const useMovieDetailsQuery = (movieId: number, enabled = true) => {
  return useQuery({
    queryKey: ["movie", "details", movieId],
    queryFn: () => tmdbService.getMovieDetails(movieId),
    enabled: enabled && movieId > 0,
    staleTime: 10 * 60 * 1000, // 10 minutos para detalles
    gcTime: 15 * 60 * 1000, // 15 minutos
  });
};

export const useGenresQuery = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: tmdbService.getGenres,
    staleTime: 30 * 60 * 1000, // 30 minutos (los géneros no cambian frecuentemente)
    gcTime: 60 * 60 * 1000, // 1 hora
  });
};
