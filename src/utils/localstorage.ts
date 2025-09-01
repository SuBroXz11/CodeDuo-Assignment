import type { SpellDetail } from "../types/spell";

const FAVORITES_KEY = "favorites";

export const getFavoritesFromStorage = (): SpellDetail[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
    return [];
  }
};

export const setFavoritesToStorage = (favorites: SpellDetail[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage", error);
  }
};
