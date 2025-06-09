import { render } from "@/common/tests/test-utils";
import type { Movie } from "@/common/types/movie";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MovieCard } from "./MovieCard";

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  overview: "Test overview",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  release_date: "2023-01-01",
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [1, 2, 3],
  adult: false,
  original_language: "en",
  original_title: "Test Movie",
  popularity: 100,
  video: false,
};

// Mock del hook useGenresQuery
vi.mock("@/common/hooks/useMoviesQuery", () => ({
  useGenresQuery: () => ({
    data: {
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
        { id: 3, name: "Comedy" },
      ],
    },
  }),
}));

describe("MovieCard", () => {
  it("renders movie information correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    // Usar getAllByText para manejar elementos duplicados
    const titles = screen.getAllByText("Test Movie");
    expect(titles).toHaveLength(2); // Hay dos elementos con el mismo texto
    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);

    // Hacer clic en el contenedor principal
    const cardContainer = screen
      .getByAltText("Test Movie")
      .closest('div[class*="pointer"]');
    fireEvent.click(cardContainer!);

    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  it("handles missing poster gracefully", () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null,
      backdrop_path: null,
    };
    render(<MovieCard movie={movieWithoutPoster} />);

    const image = screen.getByAltText("Test Movie") as HTMLImageElement;
    // Verificar que la imagen se renderiza (el componente Image maneja el fallback)
    expect(image).toBeInTheDocument();
  });

  it("formats rating correctly", () => {
    const movieWithRating = { ...mockMovie, vote_average: 7.123 };
    render(<MovieCard movie={movieWithRating} showRating={true} />);

    // Verificar que el rating se muestra
    expect(screen.getByText("7.123")).toBeInTheDocument();
  });

  it("shows genres when showGenres is true", () => {
    render(<MovieCard movie={mockMovie} showGenres={true} />);

    const genres = screen.getAllByText("Action / Drama");
    expect(genres).toHaveLength(2); // Hay dos elementos con los géneros
  });

  it("hides genres when showGenres is false", () => {
    render(<MovieCard movie={mockMovie} showGenres={false} />);

    expect(screen.queryByText("Action / Drama")).not.toBeInTheDocument();
  });

  it("displays movie overview", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Test overview")).toBeInTheDocument();
  });
});
