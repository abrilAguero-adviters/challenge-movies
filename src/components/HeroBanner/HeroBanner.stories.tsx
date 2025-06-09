import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { HeroBanner } from "./HeroBanner";

const meta: Meta<typeof HeroBanner> = {
  title: "Componentes/HeroBanner",
  component: HeroBanner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "El componente HeroBanner muestra una sección destacada con la película más popular, incluyendo su imagen de fondo, título, botón de reproducción y un indicador de usuarios viendo la película.",
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
          <div className="w-full max-w-4xl mx-auto p-4">
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof HeroBanner>;

const mockMovie = {
  id: 1,
  title: "Avengers: Endgame",
  overview:
    "Después de los devastadores eventos de Avengers: Infinity War, el universo está en ruinas...",
  poster_path: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
  backdrop_path: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
  genre_ids: [12, 878, 28],
  vote_average: 8.3,
  vote_count: 15000,
  adult: false,
  original_language: "en",
  original_title: "Avengers: Endgame",
  popularity: 1000,
  video: false,
  release_date: "2019-04-26",
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("*/movie/popular*", () => {
          return HttpResponse.json({
            results: [mockMovie],
          });
        }),
      ],
    },
  },
};

// Mock de datos para el estado de carga
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

// Mock de datos para el estado de error
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("*/movie/popular*", () => {
          return new HttpResponse(
            JSON.stringify({
              error: "Error al cargar las películas",
            }),
            { status: 500 }
          );
        }),
      ],
    },
  },
};

// Mock de datos para el estado sin películas
export const NoMovies: Story = {
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
