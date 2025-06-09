import type { Movie } from "@/common/types/movie";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("MovieCard", () => {
  it("renders movie information correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText("Test Movie"));

    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  it("handles missing poster gracefully", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);

    const image = screen.getByAltText("Test Movie") as HTMLImageElement;
    expect(image.src).toContain("placeholder-movie.jpg");
  });

  it("formats rating correctly", () => {
    const movieWithRating = { ...mockMovie, vote_average: 7.123 };
    render(<MovieCard movie={movieWithRating} />);

    expect(screen.getByText("7.1")).toBeInTheDocument();
  });
});
