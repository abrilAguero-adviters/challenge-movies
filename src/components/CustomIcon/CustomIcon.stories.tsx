import type { Meta, StoryObj } from "@storybook/react";
import CustomIcon from "./CustomIcon";

const meta: Meta<typeof CustomIcon> = {
  title: "Componentes/CustomIcon",
  component: CustomIcon,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "URL de la imagen del icono",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: { type: "number" },
      description: "Tamaño del icono en píxeles",
      table: {
        type: { summary: "number" },
      },
    },
    alt: {
      control: "text",
      description: "Texto alternativo para accesibilidad",
      table: {
        type: { summary: "string" },
      },
    },
    imgClassName: {
      control: "text",
      description: "Clases CSS adicionales para la imagen",
      table: {
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente CustomIcon es un wrapper para imágenes que se utilizan como iconos. Permite especificar el tamaño y clases adicionales, y maneja casos donde la imagen no está disponible.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomIcon>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/24",
    size: 24,
    alt: "Icono de ejemplo",
  },
};

export const Large: Story = {
  args: {
    src: "https://via.placeholder.com/48",
    size: 48,
    alt: "Icono grande",
  },
};

export const WithCustomClass: Story = {
  args: {
    src: "https://via.placeholder.com/32",
    size: 32,
    alt: "Icono con clase personalizada",
    imgClassName: "rounded-full opacity-75 hover:opacity-100",
  },
};

export const MissingIcon: Story = {
  args: {
    src: "",
    size: 24,
    alt: "Icono faltante",
  },
};
