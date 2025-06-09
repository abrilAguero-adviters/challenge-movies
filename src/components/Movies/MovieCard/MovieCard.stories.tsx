import type { Movie } from "@/common/types/movie";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";

const meta: Meta<typeof MovieCard> = {
  title: "Componentes/Movies/MovieCard",
  component: MovieCard,
  tags: ["autodocs"],
  argTypes: {
    movie: {
      description: "Objeto que contiene la información de la película",
      table: {
        type: { summary: "Movie" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño de la tarjeta de película",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    showGenres: {
      control: "boolean",
      description: "Determina si se muestran los géneros de la película",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    showRating: {
      control: "boolean",
      description: "Determina si se muestra la calificación de la película",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    onClick: {
      description: "Función que se ejecuta al hacer clic en la tarjeta",
      table: {
        type: { summary: "(movie: Movie) => void" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente MovieCard muestra una tarjeta interactiva con información de una película, incluyendo imagen, título, géneros y descripción. Soporta diferentes tamaños y estados de hover.",
      },
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

const mockMovie: Movie = {
  id: 1,
  title: "Película de Ejemplo",
  overview:
    "Esta es una descripción de ejemplo para la película. Muestra información sobre la trama y los personajes principales.",
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

export const Default: Story = {
  args: {
    movie: mockMovie,
    size: "medium",
    showGenres: true,
    showRating: false,
    onClick: (movie) => console.log("Película clickeada:", movie.title),
  },
};

export const Small: Story = {
  args: {
    movie: mockMovie,
    size: "small",
    showGenres: true,
  },
};

export const Large: Story = {
  args: {
    movie: mockMovie,
    size: "large",
    showGenres: true,
  },
};

export const WithoutGenres: Story = {
  args: {
    movie: mockMovie,
    size: "medium",
    showGenres: false,
  },
};

export const WithRating: Story = {
  args: {
    movie: mockMovie,
    size: "medium",
    showGenres: true,
    showRating: true,
  },
};
