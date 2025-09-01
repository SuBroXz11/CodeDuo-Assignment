import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSpellStore } from "../store/useSpellStore";
import { fetchSpellDetail } from "../api/spellsApi";
import type { SpellDetail } from "../types/spell";
import { toast } from "react-toastify";

const SpellDetailPage = () => {
  const { index } = useParams<{ index: string }>();
  const [spell, setSpell] = useState<SpellDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite } = useSpellStore();

  const isFavorite = favorites.some((fav) => fav.index === spell?.index);

  const handleFavoriteToggle = () => {
    if (!spell) return;
    if (isFavorite) {
      removeFavorite(spell.index);
      toast.error(`${spell.name} removed from favorites!`);
    } else {
      addFavorite(spell);
      toast.success(`${spell.name} added to favorites!`);
    }
  };

  useEffect(() => {
    const getSpellDetail = async () => {
      if (!index) return;
      setLoading(true);
      setError(null);
      try {
        const detail = await fetchSpellDetail(index);
        setSpell(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    getSpellDetail();
  }, [index]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-error">Error</h1>
        <p className="text-error">{error}</p>
        <Link to="/" className="btn btn-outline btn-primary mt-4">
          Go Home
        </Link>
      </div>
    );
  }

  if (!spell) {
    return (
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold">Spell not found!</h1>
        <Link to="/" className="btn btn-outline btn-primary mt-4">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary">{spell.name}</h1>
            <button
              onClick={handleFavoriteToggle}
              className={`btn btn-circle ${
                isFavorite ? "btn-error" : "btn-outline"
              }`}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="badge badge-primary">Level {spell.level}</div>
            <div className="badge badge-secondary">{spell.school.name}</div>
            {spell.ritual && <div className="badge badge-accent">Ritual</div>}
            {spell.concentration && (
              <div className="badge badge-warning">Concentration</div>
            )}
          </div>

          <div className="divider"></div>

          {/* Spell Info */}
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Casting Time:</span>{" "}
              {spell.casting_time}
            </p>
            <p>
              <span className="font-semibold">Range:</span> {spell.range}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {spell.duration}
            </p>
            <p>
              <span className="font-semibold">Components:</span>{" "}
              {spell.components.join(", ")}
            </p>
            {spell.material && (
              <p className="sm:col-span-2">
                <span className="font-semibold">Materials:</span>{" "}
                {spell.material}
              </p>
            )}
            <p className="sm:col-span-2">
              <span className="font-semibold">Classes:</span>{" "}
              {spell.classes.map((cls) => (
                <span key={cls.index} className="badge badge-outline ml-1">
                  {cls.name}
                </span>
              ))}
            </p>
          </div>

          {/* Damage & DC */}
          {(spell.damage || spell.dc) && (
            <>
              <div className="divider"></div>
              <div className="grid sm:grid-cols-2 gap-4">
                {spell.damage && (
                  <div>
                    <h3 className="font-bold mb-2">Damage</h3>
                    <p>{spell.damage.damage_type.name}</p>
                    <ul className="list-disc ml-5">
                      {Object.entries(
                        spell.damage.damage_at_character_level || {}
                      ).map(([lvl, dmg]) => (
                        <li key={lvl}>
                          <span className="font-semibold">Lvl {lvl}:</span>{" "}
                          {dmg}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {spell.dc && (
                  <div>
                    <h3 className="font-bold mb-2">Saving Throw</h3>
                    <p>
                      <span className="font-semibold">
                        {spell.dc.dc_type.name}
                      </span>{" "}
                      save ({spell.dc.dc_success})
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Description */}
          <div className="divider"></div>
          <h3 className="text-2xl font-semibold">Description</h3>
          {spell.desc.map((p, idx) => (
            <p key={idx} className="mb-2">
              {p}
            </p>
          ))}

          {/* Higher Levels */}
          {spell.higher_level.length > 0 && (
            <>
              <div className="divider"></div>
              <h3 className="text-2xl font-semibold">At Higher Levels</h3>
              {spell.higher_level.map((p, idx) => (
                <p key={idx} className="mb-2">
                  {p}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpellDetailPage;
