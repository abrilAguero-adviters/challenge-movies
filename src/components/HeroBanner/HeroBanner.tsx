import arrowLeftIcon from "@/common/assets/icons/arrowLeft.png";
import userIcon from "@/common/assets/icons/user.png";
import { IMAGE_SIZES, TMDB_IMAGE_BASE_URL } from "@/common/constants/tmdb";
import { useMoviesQuery } from "@/common/hooks/useMoviesQuery";
import React from "react";
import CustomIcon from "../CustomIcon/CustomIcon";
import CustomLoader from "../CustomLoader/CustomLoader";
import { Image } from "../Image/Image";
import { PlayButton } from "../PlayButton/PlayButton";

export const HeroBanner: React.FC = () => {
  const { data: movies, isLoading, isFetching } = useMoviesQuery("popular");

  // Usar la primera película popular como hero
  const heroMovie = movies?.[0];

  if (isLoading || isFetching) {
    return <CustomLoader />;
  }

  if (!heroMovie) {
    return (
      <div className="text-white text-2xl font-bold">
        No se encontró la película
      </div>
    );
  }

  const imageUrl = heroMovie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster.large}${heroMovie.poster_path}`
    : "";

  return (
    <section className="relative h-[260px] lg:h-[134px] lg:my-8 rounded-3xl overflow-hidden bg-dark-primary">
      <div className="absolute inset-0">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={heroMovie.title}
            className="w-full h-full object-cover brightness-50"
          />
        )}
      </div>

      <div className="relative z-10 p-3 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-full border border-white">
                  <CustomIcon src={userIcon} size={30} alt="user" />
                </div>
              ))}
            </div>
            <span className="text-xs text-white">+2 friends are watching</span>
          </div>

          <div className="flex max-lg:flex-col gap-5 max-lg:pb-5 justify-between">
            <button className="bg-accent-secondary max-w-40 order-2 lg:order-1 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <PlayButton
                icon={<CustomIcon src={arrowLeftIcon} size={15} alt="play" />}
                className="bg-gray-300/50"
                onClick={() => {}}
              />
              Watch Now
            </button>

            <h1 className="text-2xl lg:text-4xl font-black text-white order-1 lg:order-2">
              {heroMovie.title.toUpperCase()}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
