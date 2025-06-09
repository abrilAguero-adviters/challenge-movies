import { useMoviesQuery } from "@/common/hooks/useMoviesQuery";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import React from "react";
import { MovieCard } from "../MovieCard/MovieCard";

export const PopularMovies: React.FC = () => {
  const { data: movies, isLoading } = useMoviesQuery("popular");

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!movies || movies?.length === 0) {
    return (
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular movies 2021</h2>
        </div>
        <div className="text-center text-gray-400 py-12">
          No se encontraron películas
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h2 className="text-lg lg:text-2xl font-bold text-white">
          Popular movies 2021
        </h2>
        <button className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
          All movies →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.slice(0, 3).map((movie) => (
          <MovieCard key={movie.id} movie={movie} size="small" />
        ))}
      </div>
    </section>
  );
};
