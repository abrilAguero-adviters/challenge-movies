import { useEffect, useState } from "react";
import { tmdbService } from "../../services/tmdbService";
import type { Movie, MoviesResponse } from "../types/movie";

export interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useMovies = (
  category: "popular" | "topRated" | "upcoming" | "nowPlaying" = "popular"
): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMoviesByCategory = async (
    category: string,
    pageNum: number
  ): Promise<MoviesResponse> => {
    switch (category) {
      case "topRated":
        return tmdbService.getTopRatedMovies(pageNum);
      case "upcoming":
        return tmdbService.getUpcomingMovies(pageNum);
      case "nowPlaying":
        return tmdbService.getNowPlayingMovies(pageNum);
      default:
        return tmdbService.getPopularMovies(pageNum);
    }
  };

  const fetchMovies = async (pageNum: number = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMoviesByCategory(category, pageNum);

      if (append) {
        setMovies((prev) => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }

      setHasMore(pageNum < response.total_pages);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar las películas"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, true);
    }
  };

  const refresh = () => {
    setPage(1);
    setMovies([]);
    fetchMovies(1, false);
  };

  useEffect(() => {
    fetchMovies();
  }, [category]);

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
