import { useEffect } from "react";
import { useSpellStore } from "../store/useSpellStore";

const HomePage = () => {
  const { spells, loading, error, fetchSpells } = useSpellStore();

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  useEffect(() => {
    console.log("Spells:", spells);
  }, [spells]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Loading Spells...</h1>
        <p className="text-lg">Please wait while we fetch the spell data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Error</h1>
        <p className="text-lg text-red-400">
          Failed to load spells. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold mb-4">D&D Spell List</h1>
      <p className="text-lg">This is the main spell browsing page.</p>
      {/* we will render the spell list here in the next step */}
    </div>
  );
};

export default HomePage;
