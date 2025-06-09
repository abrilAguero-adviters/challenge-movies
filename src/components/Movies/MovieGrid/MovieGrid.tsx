import type { Movie } from "@/common/types/movie";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import React from "react";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  onMovieClick?: (movie: Movie) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading = false,
  onMovieClick,
  onLoadMore,
  hasMore = false,
}) => {
  if (loading) {
    return <CustomLoader />;
  }

  if (!movies?.length) {
    return (
      <div className="flex justify-center">
        <p>No se encontraron películas</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            className="bg-white text-dark-primary px-4 py-2 rounded-md flex items-center gap-2"
            onClick={onLoadMore}>
            Cargar más películas
          </button>
        </div>
      )}
    </div>
  );
};
