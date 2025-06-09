import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContinueWatching } from "./ContinueWatching";

const meta: Meta<typeof ContinueWatching> = {
  title: "Componentes/Movies/ContinueWatching",
  component: ContinueWatching,
  tags: ["autodocs"],
  argTypes: {
    movies: {
      description: "Array de películas que el usuario está viendo actualmente",
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
    error: {
      description: "Objeto de error si la carga falló",
      table: {
        type: { summary: "Error | null" },
      },
    },
    onMovieClick: {
      description: "Función que se ejecuta al hacer clic en una película",
      table: {
        type: { summary: "(movie: Movie) => void" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente ContinueWatching muestra una sección con las películas que el usuario está viendo actualmente, incluyendo su progreso y duración.",
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
type Story = StoryObj<typeof ContinueWatching>;

export const Default: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/now_playing*",
        method: "GET",
        status: 200,
        response: {
          results: Array.from({ length: 2 }, (_, index) => ({
            id: index + 1,
            title: `Película en Progreso ${index + 1}`,
            overview: "Esta es una descripción de ejemplo para la película.",
            poster_path: "/example-poster.jpg",
            backdrop_path: "/example-backdrop.jpg",
            genre_ids: [28, 12, 878],
            vote_average: 8.5,
            vote_count: 1000,
            adult: false,
            original_language: "es",
            original_title: `Película en Progreso ${index + 1}`,
            popularity: 1000,
            video: false,
            release_date: "2024-01-01",
          })),
        },
      },
    ],
  },
};

export const Loading: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/now_playing*",
        method: "GET",
        status: 200,
        delay: 2000,
        response: {
          results: [],
        },
      },
    ],
  },
};

export const Empty: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/now_playing*",
        method: "GET",
        status: 200,
        response: {
          results: [],
        },
      },
    ],
  },
};

export const Error: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/now_playing*",
        method: "GET",
        status: 500,
        response: {
          error: "Error al cargar las películas en reproducción",
        },
      },
    ],
  },
};
