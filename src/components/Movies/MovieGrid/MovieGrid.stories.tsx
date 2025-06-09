import type { Movie } from "@/common/types/movie";
import type { Meta, StoryObj } from "@storybook/react";
import { MovieGrid } from "./MovieGrid";

const meta: Meta<typeof MovieGrid> = {
  title: "Componentes/Movies/MovieGrid",
  component: MovieGrid,
  tags: ["autodocs"],
  argTypes: {
    movies: {
      description: "Array de películas a mostrar en la cuadrícula",
      table: {
        type: { summary: "Movie[]" },
      },
    },
    loading: {
      control: { type: "boolean" },
      description: "Indica si las películas están cargando",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    onMovieClick: {
      description: "Función que se ejecuta al hacer clic en una película",
      table: {
        type: { summary: "(movie: Movie) => void" },
      },
    },
    onLoadMore: {
      description:
        "Función que se ejecuta al hacer clic en el botón de cargar más",
      table: {
        type: { summary: "() => void" },
      },
    },
    hasMore: {
      control: { type: "boolean" },
      description: "Indica si hay más películas para cargar",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente MovieGrid muestra una cuadrícula de tarjetas de películas con soporte para carga infinita y estados de carga.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovieGrid>;

const mockMovies: Movie[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Película ${index + 1}`,
  overview: "Esta es una descripción de ejemplo para la película.",
  poster_path: "/example-poster.jpg",
  backdrop_path: "/example-backdrop.jpg",
  genre_ids: [28, 12, 878],
  vote_average: 8.5,
  vote_count: 1000,
  adult: false,
  original_language: "es",
  original_title: `Película ${index + 1}`,
  popularity: 1000,
  video: false,
  release_date: "2024-01-01",
}));

export const Default: Story = {
  args: {
    movies: mockMovies,
    loading: false,
    onMovieClick: (movie) => console.log("Película clickeada:", movie.title),
    hasMore: true,
    onLoadMore: () => console.log("Cargar más películas"),
  },
};

export const Loading: Story = {
  args: {
    movies: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    movies: [],
    loading: false,
  },
};

export const WithoutLoadMore: Story = {
  args: {
    movies: mockMovies,
    loading: false,
    hasMore: false,
    onMovieClick: (movie) => console.log("Película clickeada:", movie.title),
  },
};
