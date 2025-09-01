import { useEffect, useState, useMemo } from "react";
import { useSpellStore } from "../store/useSpellStore";
import SpellCard from "../components/shared/SpellCard";
import type { SpellListItem } from "../types/spell";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { spells, loading, error, fetchSpells } = useSpellStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  const filteredSpells = useMemo(() => {
    if (!searchTerm) return spells;
    return spells.filter((spell: SpellListItem) =>
      spell.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [spells, searchTerm]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-10 min-h-screen">
        <span className="loading loading-spinner text-primary loading-lg mb-4"></span>
        <h1 className="text-2xl font-bold text-primary">Loading spells...</h1>
        <p className="text-gray-400">
          Please wait while we fetch the arcane knowledge.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center p-10 min-h-screen">
        <h1 className="text-3xl font-bold text-error mb-2">Error</h1>
        <p className="text-error">{error}</p>
        <button className="btn btn-primary mt-4" onClick={() => fetchSpells()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-4xl font-extrabold text-primary">D&D Spellbook</h1>
        <input
          type="text"
          placeholder="🔍 Search spells..."
          className="input input-bordered w-full sm:max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Spell Grid */}
      {filteredSpells.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredSpells.map((spell) => (
            <SpellCard key={spell.index} spell={spell} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-500">🪄 No spells found.</p>
          <p className="text-sm text-gray-400">
            Try searching for another incantation.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
