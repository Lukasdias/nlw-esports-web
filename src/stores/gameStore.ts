import create from "zustand";
import { Ad, Game } from "../api/types";
import * as api from "../api";

type GameStore = {
  games: Game[];
  loadingGames: boolean;
  currentAds: Ad[];
  loadingCurrentAds: boolean;
  cleanCurrentAds: () => void;
  currentDiscord: string;
  cleanCurrentDiscord: () => void;
  fetchGames: () => void;
  fetchDiscord: (adId: string) => void;
  fetchAdsByGame: (gameId: string) => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  loadingGames: true,
  currentAds: [],
  loadingCurrentAds: false,
  cleanCurrentAds: () => set({ currentAds: [] }),
  currentDiscord: "",
  cleanCurrentDiscord: () => set({ currentDiscord: "" }),
  fetchGames: async () => {
    set({ loadingGames: true });
    try {
      set({
        games: (await api.getGames()) ?? ([] as Game[]),
      });
      console.log("games", JSON.stringify(get().games, null, 2));
    } catch (error) {
      console.log(error);
      set({ loadingGames: false });
    } finally {
      set({ loadingGames: false });
    }
  },
  fetchDiscord: async (adId: string) => {
    set({
      currentDiscord: (await api.getDiscord({ adId })) ?? "",
    });
  },
  fetchAdsByGame: async (gameId: string) => {
    set({
      currentAds: (await api.getAdsByGame({ gameId })) ?? ([] as Ad[]),
    });
  },
}));
