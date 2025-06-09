import { IMAGE_SIZES, TMDB_IMAGE_BASE_URL } from "@/common/constants/tmdb";
import { useGenresQuery } from "@/common/hooks/useMoviesQuery";
import type { Movie } from "@/common/types/movie";
import React, { useMemo, useState } from "react";
import { Image } from "../../Image/Image";
import MoviePlayer from "../MoviePlayer/MoviePlayer";

interface MovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
  showGenres?: boolean;
  showRating?: boolean;
  onClick?: (movie: Movie) => void;
}

export const Title = ({
  showGenres,
  movie,
  genresData,
}: {
  showGenres: boolean;
  movie: Movie;
  genresData: { genres: any[] };
}) => {
  const formatGenres = (genreIds: number[]) => {
    if (!genresData?.genres || !genreIds) return "";

    // Crear mapa de géneros desde la API de TMDB
    const genreMap = genresData?.genres.reduce(
      (map: Record<number, string>, genre: any) => {
        map[genre.id] = genre.name;
        return map;
      },
      {}
    );

    return genreIds
      .slice(0, 2)
      .map((id) => genreMap[id])
      .filter(Boolean)
      .join(" / ");
  };

  return (
    <div>
      <p className="text-white text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-[90%]">
        {movie.title}
      </p>
      <div className="flex flex-col gap-2">
        {showGenres && !!movie?.genre_ids && (
          <p className="text-gray-300 text-xs">
            {formatGenres(movie.genre_ids)}
          </p>
        )}
      </div>
    </div>
  );
};

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  size = "medium",
  showGenres = true,
  showRating = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [watching, setWatching] = useState(false);

  let description = "Sin descripción disponible";

  if (movie?.overview) {
    description =
      movie.overview.length > 230
        ? `${movie.overview.slice(0, 230)}...`
        : movie.overview;
  }

  const { data: genresData } = useGenresQuery();

  const imageUrl = useMemo(() => {
    if (!movie) return "";

    const showBackdrop =
      watching || ["large", "medium", "small"].includes(size);
    const imagePath = showBackdrop ? movie.backdrop_path : movie.poster_path;
    const imageSize = showBackdrop
      ? IMAGE_SIZES.backdrop.medium
      : IMAGE_SIZES.poster.medium;

    return imagePath ? `${TMDB_IMAGE_BASE_URL}/${imageSize}${imagePath}` : "";
  }, [watching, size, movie]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleWatching = () => {
    setWatching(!watching);
  };

  return (
    <div
      className={`pointer transition-all duration-300 rounded-3xl overflow-hidden max-h-44`}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick?.(movie)}>
      <div className="relative w-full bg-dark-secondary rounded-3xl overflow-hidden max-h-44">
        <Image
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {!isHovered && (
          <div
            className="absolute inset-0 z-10"
            style={{ bottom: "64px" }}
            onMouseEnter={handleMouseEnter}
          />
        )}

        <div
          className="absolute inset-0 max-h-44 bg-dark-secondary/70 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 px-3"
          style={{
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? "auto" : "none",
          }}>
          <div className="flex flex-col gap-2">
            <Title
              showGenres={showGenres}
              movie={movie}
              genresData={genresData}
            />
            <p className="text-gray-300 text-xs">{description}</p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 max-h-44"
          style={{
            opacity: isHovered ? 0 : 1,
            pointerEvents: isHovered ? "none" : "auto",
          }}>
          <div className="px-3 pb-2">
            {watching && (
              <Title
                showGenres={showGenres}
                movie={movie}
                genresData={genresData}
              />
            )}
          </div>
          <MoviePlayer
            watching={watching}
            toggleWatching={toggleWatching}
            showGenres={showGenres}
            movie={movie}
            genresData={genresData}
            showRating={showRating}
          />
        </div>
      </div>
    </div>
  );
};
