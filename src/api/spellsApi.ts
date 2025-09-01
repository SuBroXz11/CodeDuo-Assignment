import axios from "axios";
import type { SpellListItem, SpellDetail } from "../types/spell";

const API_BASE_URL = "https://www.dnd5eapi.co/api";

export const fetchAllSpells = async (): Promise<SpellListItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spells`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching all spells:", error);
    throw new Error("Failed to fetch spell list.");
  }
};

export const fetchSpellDetail = async (index: string): Promise<SpellDetail> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spells/${index}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching spell detail for ${index}:`, error);
    throw new Error(`Failed to fetch spell detail for ${index}.`);
  }
};
