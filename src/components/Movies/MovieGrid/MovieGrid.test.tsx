import type { Movie } from "@/common/types/movie";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("MovieGrid", () => {
  it("renders movies correctly", () => {
    render(<MovieGrid movies={mockMovies} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<MovieGrid movies={[]} loading={true} />);

    expect(screen.getByText("Cargando películas...")).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { hidden: true })
    ).toBeInTheDocument();
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

    fireEvent.click(screen.getByText("Movie 1"));

    expect(mockOnMovieClick).toHaveBeenCalledWith(mockMovies[0]);
  });
});
