import arrowLeftIcon from "@/common/assets/icons/arrowLeft.png";
import pauseIcon from "@/common/assets/icons/pause.png";
import { Movie } from "@/common/types/movie";
import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { PlayButton } from "@/components/PlayButton/PlayButton";
import { Title } from "../MovieCard/MovieCard";
import Controls from "./Controls";

interface MoviePlayerProps {
  watching: boolean;
  toggleWatching: () => void;
  showGenres: boolean;
  movie: Movie;
  genresData: { genres: any[] };
  showRating: boolean;
}

const MoviePlayer = ({
  watching,
  toggleWatching,
  showGenres,
  movie,
  genresData,
  showRating,
}: MoviePlayerProps) => {
  return (
    <div className="h-16 flex items-center bg-white/5 backdrop-blur-sm px-3 justify-between transition-all duration-300">
      <div className="flex gap-3 items-center">
        <PlayButton
          icon={
            watching ? (
              <CustomIcon src={pauseIcon} size={30} />
            ) : (
              <CustomIcon src={arrowLeftIcon} size={40} />
            )
          }
          onClick={(e) => {
            e.stopPropagation();
            toggleWatching();
          }}
        />
        {watching ? (
          <div className="flex items-center w-1/2 absolute bottom-6 left-14">
            {/* Tiempo transcurrido */}
            <span className="text-white text-xs font-medium">32:47</span>
            {/* Barra de progreso */}
            <div className="flex-1 h-2 rounded-full bg-white/40 mx-2 relative">
              <div
                className="absolute left-0 top-0 h-2 rounded-full bg-purple-400"
                style={{ width: "30%" }}
              />
              <div className="absolute left-4 top-[-2px] h-3 w-3 rounded-full bg-white" />
            </div>
            {/* Tiempo total */}
            <span className="text-white text-xs font-medium">02:34:28</span>
          </div>
        ) : (
          <Title
            showGenres={showGenres}
            movie={movie}
            genresData={genresData}
          />
        )}
      </div>
      <div className="border-l-3 border-white/10 h-6 flex items-center">
        <Controls watching={watching} showRating={showRating} movie={movie} />
      </div>
    </div>
  );
};

export default MoviePlayer;
