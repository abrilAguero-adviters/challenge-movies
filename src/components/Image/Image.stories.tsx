import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "Componentes/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "URL de la imagen a mostrar",
      table: {
        type: { summary: "string" },
      },
    },
    alt: {
      control: "text",
      description: "Texto alternativo para accesibilidad",
      table: {
        type: { summary: "string" },
      },
    },
    fallbackSrc: {
      control: "text",
      description: "URL de la imagen de respaldo en caso de error",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "/placeholder-movie.svg" },
      },
    },
    className: {
      control: "text",
      description: "Clases CSS adicionales",
      table: {
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente Image es un wrapper para la etiqueta img de HTML que maneja automáticamente los errores de carga de imágenes, mostrando una imagen de respaldo cuando sea necesario.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
    alt: "Imagen de ejemplo",
    className: "w-64 h-96",
  },
};

export const WithCustomFallback: Story = {
  args: {
    src: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
    alt: "Imagen con fallback personalizado",
    fallbackSrc: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
    className: "w-64 h-96",
  },
};

export const WithError: Story = {
  args: {
    src: "https://invalid-url.com/image.jpg",
    alt: "Imagen con error",
    className: "w-64 h-96",
  },
};

export const WithCustomClasses: Story = {
  args: {
    src: "https://img.aullidos.com/imagenes/noticias/tw-35564.jpg",
    alt: "Imagen con clases personalizadas",
    className:
      "w-64 h-96 rounded-lg shadow-lg hover:scale-105 transition-transform",
  },
};
