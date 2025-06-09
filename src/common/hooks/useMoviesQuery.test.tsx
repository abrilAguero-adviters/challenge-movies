import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tmdbService } from "../../services/tmdbService";
import { Movie } from "../types/movie";
import {
  useGenresQuery,
  useMovieDetailsQuery,
  useMoviesQuery,
} from "./useMoviesQuery";

// Mock del servicio TMDB
vi.mock("../../services/tmdbService", () => ({
  tmdbService: {
    getPopularMovies: vi.fn(),
    getUpcomingMovies: vi.fn(),
    getNowPlayingMovies: vi.fn(),
    getTopRatedMovies: vi.fn(),
    getMovieDetails: vi.fn(),
    getGenres: vi.fn(),
  },
}));

const mockMovies = [
  {
    id: 1,
    title: "Test Movie 1",
    overview: "Test overview 1",
    poster_path: "/poster1.jpg",
    backdrop_path: "/backdrop1.jpg",
    release_date: "2023-01-01",
    vote_average: 8.5,
    vote_count: 1000,
    genre_ids: [1, 2],
    adult: false,
    original_language: "en",
    original_title: "Test Movie 1",
    popularity: 100,
    video: false,
  },
  {
    id: 2,
    title: "Test Movie 2",
    overview: "Test overview 2",
    poster_path: "/poster2.jpg",
    backdrop_path: "/backdrop2.jpg",
    release_date: "2023-02-01",
    vote_average: 7.5,
    vote_count: 800,
    genre_ids: [3, 4],
    adult: false,
    original_language: "en",
    original_title: "Test Movie 2",
    popularity: 90,
    video: false,
  },
];

const mockMovieDetails: Movie = {
  id: 1,
  title: "Test Movie Details",
  overview: "Detailed overview",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  release_date: "2023-01-01",
  vote_average: 8.5,
  vote_count: 1000,
  genres: [{ id: 1, name: "Action" }],
  runtime: 120,
  status: "Released",
  genre_ids: [],
  adult: false,
  original_language: "",
  original_title: "",
  popularity: 0,
  video: false,
};

const mockGenres = {
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Comedy" },
  ],
};

// Wrapper para los tests
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMoviesQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches popular movies", async () => {
    vi.mocked(tmdbService.getPopularMovies).mockResolvedValue({
      results: mockMovies,
      page: 1,
      total_pages: 1,
      total_results: 2,
    });

    const { result } = renderHook(() => useMoviesQuery("popular"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovies);
    expect(tmdbService.getPopularMovies).toHaveBeenCalledWith(1);
  });

  it("fetches upcoming movies", async () => {
    vi.mocked(tmdbService.getUpcomingMovies).mockResolvedValue({
      results: mockMovies,
      page: 1,
      total_pages: 1,
      total_results: 2,
    });

    const { result } = renderHook(() => useMoviesQuery("upcoming"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovies);
    expect(tmdbService.getUpcomingMovies).toHaveBeenCalledWith(1);
  });

  it("fetches now playing movies", async () => {
    vi.mocked(tmdbService.getNowPlayingMovies).mockResolvedValue({
      results: mockMovies,
      page: 1,
      total_pages: 1,
      total_results: 2,
    });

    const { result } = renderHook(() => useMoviesQuery("nowPlaying"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovies);
    expect(tmdbService.getNowPlayingMovies).toHaveBeenCalledWith(1);
  });

  it("fetches top rated movies", async () => {
    vi.mocked(tmdbService.getTopRatedMovies).mockResolvedValue({
      results: mockMovies,
      page: 1,
      total_pages: 1,
      total_results: 2,
    });

    const { result } = renderHook(() => useMoviesQuery("topRated"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovies);
    expect(tmdbService.getTopRatedMovies).toHaveBeenCalledWith(1);
  });

  it("handles custom page parameter", async () => {
    vi.mocked(tmdbService.getPopularMovies).mockResolvedValue({
      results: mockMovies,
      page: 2,
      total_pages: 2,
      total_results: 2,
    });

    const { result } = renderHook(
      () => useMoviesQuery("popular", { page: 2 }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(tmdbService.getPopularMovies).toHaveBeenCalledWith(2);
  });

  it("respects enabled option", () => {
    const { result } = renderHook(
      () => useMoviesQuery("popular", { enabled: false }),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isFetching).toBe(false);
    expect(tmdbService.getPopularMovies).not.toHaveBeenCalled();
  });

  it("throws error for invalid category", async () => {
    const { result } = renderHook(() => useMoviesQuery("invalid" as any), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toHaveProperty(
      "message",
      "Categoría no válida: invalid"
    );
  });
});

describe("useMovieDetailsQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches movie details", async () => {
    vi.mocked(tmdbService.getMovieDetails).mockResolvedValue(mockMovieDetails);

    const { result } = renderHook(() => useMovieDetailsQuery(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovieDetails);
    expect(tmdbService.getMovieDetails).toHaveBeenCalledWith(1);
  });

  it("does not fetch when movieId is 0", () => {
    const { result } = renderHook(() => useMovieDetailsQuery(0), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(tmdbService.getMovieDetails).not.toHaveBeenCalled();
  });

  it("respects enabled option", () => {
    const { result } = renderHook(() => useMovieDetailsQuery(1, false), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(tmdbService.getMovieDetails).not.toHaveBeenCalled();
  });
});

describe("useGenresQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches genres", async () => {
    vi.mocked(tmdbService.getGenres).mockResolvedValue(mockGenres);

    const { result } = renderHook(() => useGenresQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockGenres);
    expect(tmdbService.getGenres).toHaveBeenCalled();
  });
});
