import { useMoviesQuery } from "@/common/hooks/useMoviesQuery";
import React from "react";
import CustomLoader from "../../CustomLoader/CustomLoader";
import { MovieCard } from "../MovieCard/MovieCard";

export const ContinueWatching: React.FC = () => {
  const {
    data: nowPlayingMovies,
    isLoading,
    isFetching,
  } = useMoviesQuery("nowPlaying");

  // Simular películas en progreso con datos reales
  const continueWatchingMovies = (nowPlayingMovies ?? [])
    .slice(0, 2)
    .map((movie, index) => ({
      ...movie,
      duration: `0${Math.floor(Math.random() * 3) + 1}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")}:00`,
      progress: [45, 78][index] || Math.floor(Math.random() * 80) + 10,
      viewers: Math.floor(Math.random() * 5) + 1,
    }));

  if (isLoading || isFetching) return <CustomLoader />;

  if (!continueWatchingMovies?.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 lg:gap-5 items-center">
          <h2 className="text-lg lg:text-2xl font-bold border-r border-gray-500 pr-2 lg:pr-5">
            Continue Watching
          </h2>
          <span className="text-sm text-gray-400">
            {continueWatchingMovies.length} Movies
          </span>
        </div>
        <button className="text-sm text-gray-400">All movies →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {continueWatchingMovies.map((movie) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
