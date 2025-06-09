import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Componentes/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    primary: {
      control: "boolean",
      description: "Determina si el botón es de tipo primario o secundario",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño del botón",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    label: {
      control: "text",
      description: "Texto que se muestra en el botón",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundColor: {
      control: "text",
      description: "Color de fondo personalizado (opcional)",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Clases CSS adicionales",
      table: {
        type: { summary: "string" },
      },
    },
    onClick: {
      description: "Función que se ejecuta al hacer clic en el botón",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente Button es un botón reutilizable que soporta diferentes variantes, tamaños y estados. Utiliza TailwindCSS para los estilos y es completamente accesible.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Botón Primario",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: "Botón Secundario",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    primary: true,
    label: "Botón Pequeño",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    primary: true,
    label: "Botón Grande",
    size: "large",
  },
};

export const CustomBackground: Story = {
  args: {
    primary: false,
    label: "Botón Personalizado",
    backgroundColor: "bg-purple-600 hover:bg-purple-700",
    size: "medium",
  },
};
