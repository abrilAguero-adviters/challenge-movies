import { MOCK_SORT_OPTIONS } from "@/__mock__/genres";
import { useMoviesQuery } from "@/common/hooks";
import { MovieCard } from "@/components/Movies/MovieCard/MovieCard";

const Trailers = () => {
  const { data: upcomingMovies } = useMoviesQuery("upcoming");

  // Primeras 3 películas para trailers
  const trailerMovies = upcomingMovies?.slice(0, 3) ?? [];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-white text-lg font-bold">New trailers</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400 w-full sm:w-auto">
          <span>Sort by</span>
          <select className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1 sm:flex-none">
            {MOCK_SORT_OPTIONS.map((option) => (
              <option
                key={option.id}
                value={option.value}
                className="bg-dark-primary">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {trailerMovies.map((movie) => (
          <MovieCard key={movie?.id} movie={movie} size="small" />
        ))}
      </div>
    </section>
  );
};

export default Trailers;
