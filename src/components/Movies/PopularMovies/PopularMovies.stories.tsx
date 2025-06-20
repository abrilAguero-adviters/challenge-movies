import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { PopularMovies } from "./PopularMovies";

const meta: Meta<typeof PopularMovies> = {
  title: "Componentes/Movies/PopularMovies",
  component: PopularMovies,
  tags: ["autodocs"],
  argTypes: {
    movies: {
      description: "Array de películas populares a mostrar",
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
          "El componente PopularMovies muestra una sección con las películas más populares del año, incluyendo un título, botón para ver todas las películas y una cuadrícula de tarjetas de películas.",
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
type Story = StoryObj<typeof PopularMovies>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("*/movie/popular*", () => {
          return HttpResponse.json({
            results: Array.from({ length: 3 }, (_, index) => ({
              id: index + 1,
              title: `Película Popular ${index + 1}`,
              overview: "Esta es una descripción de ejemplo para la película.",
              poster_path:
                "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
              backdrop_path:
                "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
              genre_ids: [28, 12, 878],
              vote_average: 8.5,
              vote_count: 1000,
              adult: false,
              original_language: "es",
              original_title: `Película Popular ${index + 1}`,
              popularity: 1000,
              video: false,
              release_date: "2024-01-01",
            })),
          });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("*/movie/popular*", async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return HttpResponse.json({
            results: [],
          });
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("*/movie/popular*", () => {
          return HttpResponse.json({
            results: [],
          });
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("*/movie/popular*", () => {
          return new HttpResponse(
            JSON.stringify({
              error: "Error al cargar las películas populares",
            }),
            { status: 500 }
          );
        }),
      ],
    },
  },
};
