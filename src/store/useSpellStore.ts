import { create } from "zustand";
import { fetchAllSpells } from "../api/spellsApi";
import type { SpellListItem, SpellDetail } from "../types/spell";
import {
  getFavoritesFromStorage,
  setFavoritesToStorage,
} from "../utils/localstorage";

interface SpellState {
  spells: SpellListItem[];
  favorites: SpellDetail[];
  loading: boolean;
  error: string | null;
  fetchSpells: () => Promise<void>;
  addFavorite: (spell: SpellDetail) => void;
  removeFavorite: (spellIndex: string) => void;
}

export const useSpellStore = create<SpellState>((set, get) => ({
  spells: [],
  favorites: getFavoritesFromStorage(),
  loading: false,
  error: null,

  fetchSpells: async () => {
    set({ loading: true, error: null });
    try {
      const spells = await fetchAllSpells();
      set({ spells, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ loading: false, error: error.message });
      } else {
        set({ loading: false, error: "An unknown error occurred." });
      }
    }
  },

  addFavorite: (spell) => {
    const { favorites } = get();
    if (!favorites.find((fav) => fav.index === spell.index)) {
      const newFavorites = [...favorites, spell];
      set({ favorites: newFavorites });
      setFavoritesToStorage(newFavorites);
    }
  },

  removeFavorite: (spellIndex) => {
    const { favorites } = get();
    const newFavorites = favorites.filter(
      (spell) => spell.index !== spellIndex
    );
    set({ favorites: newFavorites });
    setFavoritesToStorage(newFavorites);
  },
}));
