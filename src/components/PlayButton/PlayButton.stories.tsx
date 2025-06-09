import arrowLeftIcon from "@/common/assets/icons/arrowLeft.png";
import type { Meta, StoryObj } from "@storybook/react";
import CustomIcon from "../CustomIcon/CustomIcon";
import { PlayButton } from "./PlayButton";

const meta: Meta<typeof PlayButton> = {
  title: "Componentes/PlayButton",
  component: PlayButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Elemento React a mostrar dentro del botón",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    onClick: {
      description: "Función que se ejecuta al hacer clic en el botón",
      table: {
        type: { summary: "(e: React.MouseEvent<HTMLButtonElement>) => void" },
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
          "El componente PlayButton es un botón circular que se utiliza principalmente para acciones de reproducción. Acepta un icono personalizado y puede ser estilizado adicionalmente mediante clases CSS.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlayButton>;

export const Default: Story = {
  args: {
    icon: <CustomIcon src={arrowLeftIcon} size={15} alt="play" />,
    onClick: () => console.log("Botón de reproducción clickeado"),
  },
};

export const WithCustomClass: Story = {
  args: {
    icon: <CustomIcon src={arrowLeftIcon} size={15} alt="play" />,
    onClick: () => console.log("Botón de reproducción clickeado"),
    className: "bg-accent-primary hover:bg-accent-primary/90",
  },
};

export const Large: Story = {
  args: {
    icon: <CustomIcon src={arrowLeftIcon} size={24} alt="play" />,
    onClick: () => console.log("Botón de reproducción clickeado"),
    className: "w-12 h-12",
  },
};

export const Disabled: Story = {
  args: {
    icon: <CustomIcon src={arrowLeftIcon} size={15} alt="play" />,
    onClick: () => console.log("Botón de reproducción clickeado"),
    className: "opacity-50 cursor-not-allowed",
    disabled: true,
  },
};
