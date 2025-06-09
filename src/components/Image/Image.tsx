import React, { useCallback, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const DEFAULT_FALLBACK = "/placeholder-movie.svg";

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  }, [hasError, currentSrc, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`w-full h-full object-cover transition-opacity duration-300 ${
        hasError ? "opacity-70 grayscale-30" : ""
      } ${className}`}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};
