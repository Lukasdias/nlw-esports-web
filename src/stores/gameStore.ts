import create from "zustand";
import { Ad, AddAdToGameRequest, Game } from "../api/types";
import * as api from "../api";

type GameStore = {
  games: Game[];
  loadingGames: boolean;
  currentAds: Ad[];
  loadingCurrentAds: boolean;
  currentDiscord: string;
  isSendingAd: boolean;
  errorOnSendAd: boolean;
  errorOnFetchGames: boolean;
  errorOnFetchAds: boolean;
  cleanCurrentAds: () => void;
  cleanCurrentDiscord: () => void;
  fetchGames: () => void;
  fetchDiscord: (adId: string) => void;
  fetchAdsByGame: (gameId: string) => void;
  postAd: (body: AddAdToGameRequest) => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  loadingGames: true,
  currentAds: [],
  loadingCurrentAds: false,
  currentDiscord: "",
  isSendingAd: false,
  errorOnSendAd: false,
  errorOnFetchGames: false,
  errorOnFetchAds: false,
  cleanCurrentAds: () => set({ currentAds: [] }),
  cleanCurrentDiscord: () => set({ currentDiscord: "" }),
  fetchGames: async () => {
    set({ loadingGames: true });
    try {
      set({
        games: (await api.getGames()) ?? ([] as Game[]),
      });
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
  postAd: async (body: AddAdToGameRequest) => {
    try {
      set({ isSendingAd: true });
      await api.addAdToGame(body);
    } catch (error) {
      console.log(error);
      set({ errorOnSendAd: true });
      set({ isSendingAd: false });
    } finally {
      set({ isSendingAd: false });
    }
  },
}));
