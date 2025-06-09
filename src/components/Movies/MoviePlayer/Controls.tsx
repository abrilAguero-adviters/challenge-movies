import controlIcon from "@/common/assets/icons/control.png";
import fullscreenIcon from "@/common/assets/icons/fullscreen.png";
import soundIcon from "@/common/assets/icons/sound.png";
import starIcon from "@/common/assets/icons/star.png";
import { Movie } from "@/common/types/movie";
import CustomIcon from "@/components/CustomIcon/CustomIcon";

interface ControlsProps {
  watching: boolean;
  showRating: boolean;
  movie: Movie;
}

const Controls = ({ watching, showRating, movie }: ControlsProps) => {
  if (watching) {
    return (
      <div className="flex gap-3 items-center">
        <CustomIcon
          src={controlIcon}
          size={30}
          imgClassName="hover:scale-110 transition-all duration-300 cursor-pointer"
        />
        <CustomIcon
          src={soundIcon}
          size={30}
          imgClassName="hover:scale-110 transition-all duration-300 cursor-pointer"
        />
        <CustomIcon
          src={fullscreenIcon}
          size={30}
          imgClassName="hover:scale-110 transition-all duration-300 cursor-pointer"
        />
      </div>
    );
  }

  if (showRating) {
    return (
      <div className="flex gap-2 items-center">
        <CustomIcon src={starIcon} size={30} />
        <p className="text-white text-sm font-extrabold">
          {movie.vote_average}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center rounded-full bg-white h-5 px-2">
      <p className="text-xs font-extrabold text-dark-primary">02:34:28</p>
    </div>
  );
};

export default Controls;
