import { render } from "@/common/tests/test-utils";
import type { Movie } from "@/common/types/movie";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MovieGrid } from "./MovieGrid";

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Movie 1",
    overview: "Overview 1",
    poster_path: "/poster1.jpg",
    backdrop_path: "/backdrop1.jpg",
    release_date: "2023-01-01",
    vote_average: 8.5,
    vote_count: 1000,
    genre_ids: [1, 2],
    adult: false,
    original_language: "en",
    original_title: "Movie 1",
    popularity: 100,
    video: false,
  },
  {
    id: 2,
    title: "Movie 2",
    overview: "Overview 2",
    poster_path: "/poster2.jpg",
    backdrop_path: "/backdrop2.jpg",
    release_date: "2023-02-01",
    vote_average: 7.5,
    vote_count: 800,
    genre_ids: [3, 4],
    adult: false,
    original_language: "en",
    original_title: "Movie 2",
    popularity: 90,
    video: false,
  },
];

// Mock del hook useGenresQuery
vi.mock("@/common/hooks/useMoviesQuery", () => ({
  useGenresQuery: () => ({
    data: {
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
        { id: 3, name: "Comedy" },
        { id: 4, name: "Thriller" },
      ],
    },
  }),
}));

describe("MovieGrid", () => {
  it("renders movies correctly", () => {
    render(<MovieGrid movies={mockMovies} />);

    // Usar getAllByText para manejar elementos duplicados
    const movie1Titles = screen.getAllByText("Movie 1");
    const movie2Titles = screen.getAllByText("Movie 2");
    expect(movie1Titles).toHaveLength(2); // Hay dos elementos por película
    expect(movie2Titles).toHaveLength(2);
  });

  it("shows loading state", () => {
    render(<MovieGrid movies={[]} loading={true} />);

    // El CustomLoader muestra elementos skeleton
    const skeletonElements = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("shows load more button when hasMore is true", () => {
    const mockLoadMore = vi.fn();
    render(
      <MovieGrid movies={mockMovies} hasMore={true} onLoadMore={mockLoadMore} />
    );

    const loadMoreButton = screen.getByText("Cargar más películas");
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
    expect(mockLoadMore).toHaveBeenCalled();
  });

  it("shows empty state when no movies", () => {
    render(<MovieGrid movies={[]} />);

    expect(screen.getByText("No se encontraron películas")).toBeInTheDocument();
  });

  it("calls onMovieClick when movie is clicked", () => {
    const mockOnMovieClick = vi.fn();
    render(<MovieGrid movies={mockMovies} onMovieClick={mockOnMovieClick} />);

    // Hacer clic en el primer contenedor de película
    const firstMovieContainer = screen
      .getAllByText("Movie 1")[0]
      .closest('div[class*="pointer"]');
    fireEvent.click(firstMovieContainer!);

    expect(mockOnMovieClick).toHaveBeenCalledWith(mockMovies[0]);
  });

  it("does not show load more button when hasMore is false", () => {
    render(<MovieGrid movies={mockMovies} hasMore={false} />);

    expect(screen.queryByText("Cargar más películas")).not.toBeInTheDocument();
  });

  it("renders correct number of movie cards", () => {
    render(<MovieGrid movies={mockMovies} />);

    // Verificar que se renderizan las imágenes de las películas
    expect(screen.getByAltText("Movie 1")).toBeInTheDocument();
    expect(screen.getByAltText("Movie 2")).toBeInTheDocument();
  });
});
