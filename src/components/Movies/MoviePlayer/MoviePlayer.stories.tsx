import type { Movie } from "@/common/types/movie";
import type { Meta, StoryObj } from "@storybook/react";
import MoviePlayer from "./MoviePlayer";

const meta: Meta<typeof MoviePlayer> = {
  title: "Componentes/Movies/MoviePlayer",
  component: MoviePlayer,
  tags: ["autodocs"],
  argTypes: {
    watching: {
      control: { type: "boolean" },
      description: "Indica si la película está reproduciéndose",
      table: {
        type: { summary: "boolean" },
      },
    },
    toggleWatching: {
      description: "Función para alternar el estado de reproducción",
      table: {
        type: { summary: "() => void" },
      },
    },
    showGenres: {
      control: { type: "boolean" },
      description: "Determina si se muestran los géneros de la película",
      table: {
        type: { summary: "boolean" },
      },
    },
    movie: {
      description: "Objeto que contiene la información de la película",
      table: {
        type: { summary: "Movie" },
      },
    },
    genresData: {
      description: "Datos de géneros de películas",
      table: {
        type: { summary: "{ genres: any[] }" },
      },
    },
    showRating: {
      control: { type: "boolean" },
      description: "Determina si se muestra la calificación de la película",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente MoviePlayer muestra los controles de reproducción de una película, incluyendo botón de play/pause, barra de progreso y controles adicionales.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoviePlayer>;

const mockMovie: Movie = {
  id: 1,
  title: "Película de Ejemplo",
  overview: "Esta es una descripción de ejemplo para la película.",
  poster_path: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
  backdrop_path: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
  genre_ids: [28, 12, 878],
  vote_average: 8.5,
  vote_count: 1000,
  adult: false,
  original_language: "es",
  original_title: "Película de Ejemplo",
  popularity: 1000,
  video: false,
  release_date: "2024-01-01",
};

const mockGenresData = {
  genres: [
    { id: 28, name: "Acción" },
    { id: 12, name: "Aventura" },
    { id: 878, name: "Ciencia Ficción" },
  ],
};

export const NotPlaying: Story = {
  args: {
    watching: false,
    toggleWatching: () => console.log("Cambiar estado de reproducción"),
    showGenres: true,
    movie: mockMovie,
    genresData: mockGenresData,
    showRating: false,
  },
};

export const Playing: Story = {
  args: {
    watching: true,
    toggleWatching: () => console.log("Cambiar estado de reproducción"),
    showGenres: true,
    movie: mockMovie,
    genresData: mockGenresData,
    showRating: true,
  },
};

export const WithoutGenres: Story = {
  args: {
    watching: false,
    toggleWatching: () => console.log("Cambiar estado de reproducción"),
    showGenres: false,
    movie: mockMovie,
    genresData: mockGenresData,
    showRating: false,
  },
};

export const WithRating: Story = {
  args: {
    watching: false,
    toggleWatching: () => console.log("Cambiar estado de reproducción"),
    showGenres: true,
    movie: mockMovie,
    genresData: mockGenresData,
    showRating: true,
  },
};
