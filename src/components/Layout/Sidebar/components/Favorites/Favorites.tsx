import { useState } from "react";

// Géneros iniciales (puedes modificar estos nombres)
const INITIAL_GENRES = [
  { name: "Action", color: "bg-purple-500", selected: false },
  { name: "Western", color: "bg-orange-500", selected: false },
  { name: "Adventures", color: "bg-purple-400", selected: false },
  { name: "Drama", color: "bg-orange-400", selected: false },
  { name: "Sci-Fi", color: "bg-cyan-300", selected: false },
  { name: "Crime", color: "bg-neutral-800", selected: false },
  { name: "Comedy", color: "bg-neutral-700", selected: false },
  { name: "Thriller", color: "bg-neutral-800", selected: false },
];

const Favorites = () => {
  const [genres, setGenres] = useState(INITIAL_GENRES);
  const [showAddGenre, setShowAddGenre] = useState(false);
  const [newGenreName, setNewGenreName] = useState("");

  const handleToggleGenre = (name: string) => {
    setGenres((prev) =>
      prev.map((g) => (g.name === name ? { ...g, selected: !g.selected } : g))
    );
  };

  const handleCreateGenre = () => {
    const trimmed = newGenreName.trim();
    if (
      trimmed &&
      !genres.some((g) => g.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      setGenres([
        ...genres,
        {
          name: trimmed,
          color: "bg-cyan-300", // Puedes elegir otro color para custom
          selected: false,
        },
      ]);
      setNewGenreName("");
      setShowAddGenre(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreateGenre();
    else if (e.key === "Escape") {
      setShowAddGenre(false);
      setNewGenreName("");
    }
  };

  const selectedGenres = genres.filter((g) => g.selected);
  const unselectedGenres = genres.filter((g) => !g.selected);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-white text-lg font-bold">Favourite genres</h2>
      <div className="flex flex-wrap gap-2">
        {selectedGenres.map((genre) => (
          <button
            key={genre.name}
            className={`px-3 py-1 text-sm sm:text-base rounded-full text-white font-semibold ${genre.color}`}
            onClick={() => handleToggleGenre(genre.name)}>
            {genre.name}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-xl text-neutral-300 hover:text-white"
          onClick={() => setShowAddGenre(true)}>
          +
        </button>
        <span className="text-neutral-200 text-sm sm:text-base">
          Add your favourite genres
        </span>
      </div>
      {showAddGenre && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="px-3 py-2 rounded bg-neutral-800 text-white outline-none w-full sm:w-auto"
            type="text"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            placeholder="New genre name"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateGenre}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm">
              Add
            </button>
            <button
              onClick={() => {
                setShowAddGenre(false);
                setNewGenreName("");
              }}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {unselectedGenres.map((genre) => (
          <button
            key={genre.name}
            className="px-3 py-1 text-sm sm:text-base rounded-full text-neutral-300 bg-neutral-800 font-semibold hover:bg-neutral-700 transition-colors"
            onClick={() => handleToggleGenre(genre.name)}>
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Favorites;
