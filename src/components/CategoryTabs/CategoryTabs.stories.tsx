import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CategoryTabs, MovieCategory } from "./CategoryTabs";

const meta: Meta<typeof CategoryTabs> = {
  title: "Componentes/CategoryTabs",
  component: CategoryTabs,
  tags: ["autodocs"],
  argTypes: {
    activeCategory: {
      control: { type: "select" },
      options: ["popular", "topRated", "upcoming", "nowPlaying"],
      description: "Categoría de películas actualmente seleccionada",
      table: {
        type: { summary: "MovieCategory" },
        defaultValue: { summary: "popular" },
      },
    },
    onCategoryChange: {
      description: "Función que se ejecuta cuando se cambia de categoría",
      table: {
        type: { summary: "(category: MovieCategory) => void" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "El componente CategoryTabs muestra una barra de navegación con diferentes categorías de películas. Permite al usuario cambiar entre las categorías disponibles y resalta visualmente la categoría activa.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryTabs>;

// Componente wrapper para manejar el estado
const CategoryTabsWithState = () => {
  const [activeCategory, setActiveCategory] =
    useState<MovieCategory>("popular");
  return (
    <CategoryTabs
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    />
  );
};

export const Interactive: Story = {
  render: () => <CategoryTabsWithState />,
};

export const Popular: Story = {
  args: {
    activeCategory: "popular",
    onCategoryChange: (category) =>
      console.log("Categoría seleccionada:", category),
  },
};

export const TopRated: Story = {
  args: {
    activeCategory: "topRated",
    onCategoryChange: (category) =>
      console.log("Categoría seleccionada:", category),
  },
};

export const Upcoming: Story = {
  args: {
    activeCategory: "upcoming",
    onCategoryChange: (category) =>
      console.log("Categoría seleccionada:", category),
  },
};

export const NowPlaying: Story = {
  args: {
    activeCategory: "nowPlaying",
    onCategoryChange: (category) =>
      console.log("Categoría seleccionada:", category),
  },
};
