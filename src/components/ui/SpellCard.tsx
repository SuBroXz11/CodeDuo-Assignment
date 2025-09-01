import { Link } from "react-router-dom";
import { useSpellStore } from "../../store/useSpellStore";
import type { SpellListItem } from "../../types/spell";
import { fetchSpellDetail } from "../../api/spellsApi";
import { toast } from "react-toastify";

interface SpellCardProps {
  spell: SpellListItem;
}

const SpellCard = ({ spell }: SpellCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useSpellStore();
  const isFavorite = favorites.some((fav) => fav.index === spell.index);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    e.preventDefault();

    if (isFavorite) {
      removeFavorite(spell.index);
      toast.error(`${spell.name} removed from favorites.`, {
        position: "top-right",
      });
    } else {
      try {
        const fullSpell = await fetchSpellDetail(spell.index);
        addFavorite(fullSpell);
        toast.success(`${spell.name} added to favorites!`, {
          position: "top-right",
        });
      } catch (error) {
        toast.error(`Failed to add ${spell.name} to favorites.`, {
          position: "top-right",
        });
        throw error;
      }
    }
  };

  return (
    <Link
      to={`/spells/${spell.index}`}
      className="card w-80 bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 m-3"
    >
      <div className="card-body relative">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 btn btn-circle btn-sm bg-base-100 hover:scale-110 transition-transform"
        >
          {isFavorite ? (
            <span className="text-red-500 text-lg">♥</span>
          ) : (
            <span className="text-gray-400 text-lg">♡</span>
          )}
        </button>

        {/* Spell Info */}
        <h2 className="card-title text-primary">{spell.name}</h2>
        <p className="text-sm text-gray-400">Click to view details</p>

        <div className="card-actions justify-end mt-3">
          <div className="badge badge-outline">{spell.index}</div>
        </div>
      </div>
    </Link>
  );
};

export default SpellCard;
