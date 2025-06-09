import axios from "axios";
import {
  ENDPOINTS,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../common/constants/tmdb";
import type { Movie, MoviesResponse } from "../common/types/movie";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const tmdbService = {
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>(ENDPOINTS.popular, {
      params: { page },
    });
    return response.data;
  },

  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>(ENDPOINTS.topRated, {
      params: { page },
    });
    return response.data;
  },

  getUpcomingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>(ENDPOINTS.upcoming, {
      params: { page },
    });
    return response.data;
  },

  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>(ENDPOINTS.nowPlaying, {
      params: { page },
    });
    return response.data;
  },

  searchMovies: async (
    query: string,
    page: number = 1
  ): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>(ENDPOINTS.search, {
      params: { query, page },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<Movie> => {
    const response = await tmdbApi.get<Movie>(`/movie/${movieId}`);
    return response.data;
  },

  getGenres: async (): Promise<{ genres: any[] }> => {
    const response = await tmdbApi.get("/genre/movie/list");
    return response.data;
  },
};
