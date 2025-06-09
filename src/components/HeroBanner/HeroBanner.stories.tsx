import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof HeroBanner>;

export const Default: Story = {
  args: {},
};

// Mock de datos para el estado de carga
export const Loading: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/popular*",
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

// Mock de datos para el estado de error
export const Error: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/popular*",
        method: "GET",
        status: 500,
        response: {
          error: "Error al cargar las películas",
        },
      },
    ],
  },
};

// Mock de datos para el estado sin películas
export const NoMovies: Story = {
  parameters: {
    mockData: [
      {
        url: "*/movie/popular*",
        method: "GET",
        status: 200,
        response: {
          results: [],
        },
      },
    ],
  },
};
