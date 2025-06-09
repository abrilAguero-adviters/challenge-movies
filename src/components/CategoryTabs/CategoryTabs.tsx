import React from "react";

export type MovieCategory = "popular" | "topRated" | "upcoming" | "nowPlaying";

interface CategoryTabsProps {
  activeCategory: MovieCategory;
  onCategoryChange: (category: MovieCategory) => void;
}

const CATEGORY_LABELS: Record<MovieCategory, string> = {
  popular: "Populares",
  topRated: "Mejor Calificadas",
  upcoming: "Próximamente",
  nowPlaying: "En Cartelera",
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories = Object.keys(CATEGORY_LABELS) as MovieCategory[];

  return (
    <div className="w-full px-6 mb-8">
      <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
        {categories?.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full font-semibold text-sm border-2 transition-all duration-200 whitespace-nowrap min-w-[100px] ${
              activeCategory === category
                ? "bg-white text-dark-primary border-white shadow-md"
                : "bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-white"
            }`}
            onClick={() => onCategoryChange(category)}>
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </div>
  );
};
