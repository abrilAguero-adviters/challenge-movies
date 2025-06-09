export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const TMDB_API_KEY =
  import.meta.env.VITE_TMDB_API_KEY ||
  (() => {
    console.warn(
      "⚠️ TMDB API Key no configurada. Para mostrar películas reales:"
    );
    console.warn(
      "1. Obtén una API key gratis en https://www.themoviedb.org/settings/api"
    );
    console.warn("2. Crea un archivo .env en la raíz del proyecto");
    console.warn("3. Agrega: VITE_TMDB_API_KEY=tu_api_key_aqui");
    console.warn("4. Reinicia el servidor de desarrollo");
    return "demo_key";
  })();

export const IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w380",
    large: "w500",
    xlarge: "w780",
    original: "original",
  },
  backdrop: {
    small: "w185",
    medium: "w500",
    large: "w600",
    original: "original",
  },
} as const;

export const ENDPOINTS = {
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
  nowPlaying: "/movie/now_playing",
  discover: "/discover/movie",
  search: "/search/movie",
  genres: "/genre/movie/list",
} as const;
