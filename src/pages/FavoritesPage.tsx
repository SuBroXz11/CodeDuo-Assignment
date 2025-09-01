import { useState, useMemo } from "react";
import { useSpellStore } from "../store/useSpellStore";
import SpellCard from "../components/shared/SpellCard";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = useSpellStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = useMemo(() => {
    if (!searchTerm) return favorites;
    return favorites.filter((spell) =>
      spell.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-4xl font-extrabold text-secondary">
          My Favorite Spells
        </h1>
        <input
          type="text"
          placeholder="🔍 Search favorites..."
          className="input input-bordered w-full sm:max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredFavorites.map((spell) => (
            <Link key={spell.index} to={`/spells/${spell.index}`}>
              <SpellCard spell={spell} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          {searchTerm ? (
            <>
              <p className="text-lg text-gray-500">
                🪄 No spells found for your search.
              </p>
              <p className="text-sm text-gray-400">
                Try a different search term.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-500">
                You haven't added any favorite spells yet!
              </p>
              <p className="text-sm text-gray-400">
                Go back to the{" "}
                <Link
                  to="/"
                  className="text-primary font-semibold hover:underline"
                >
                  home page
                </Link>{" "}
                to find some spells.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
