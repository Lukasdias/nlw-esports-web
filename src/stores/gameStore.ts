import create from "zustand";
import { Ad, AddAdToGameRequest, Game } from "api/types";
import * as api from "api/index";

type GameStore = {
  games: Game[];
  loadingGames: boolean;
  currentAds: Ad[];
  loadingCurrentAds: boolean;
  loadingDiscord: boolean;
  currentDiscord: string;
  isSendingAd: boolean;
  errorOnSendAd: boolean;
  errorOnFetchGames: boolean;
  errorOnFetchAds: boolean;
  errorOnFetchDiscord: boolean;
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
  loadingGameAds: false,
  errorOnSendAd: false,
  errorOnFetchGames: false,
  errorOnFetchAds: false,
  errorOnFetchDiscord: false,
  loadingDiscord: false,
  cleanCurrentAds: () => set({ currentAds: [] }),
  cleanCurrentDiscord: () => set({ currentDiscord: "" }),
  fetchGames: async () => {
    set({ loadingGames: true, errorOnFetchGames: false });
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
      loadingDiscord: true,
      errorOnFetchDiscord: false,
    });
    try {
      const discord: string = await api.getDiscord({
        adId,
      });
      set({ currentDiscord: discord });
    } catch (error) {
      console.log(error);
      set({
        currentDiscord: "",
        errorOnFetchDiscord: true,
      });
    } finally {
      set({ loadingDiscord: false });
    }
    set({
      currentDiscord: (await api.getDiscord({ adId })) ?? "",
    });
  },
  fetchAdsByGame: async (gameId: string) => {
    set({ loadingCurrentAds: true });
    set({ errorOnFetchAds: false });
    try {
      set({
        currentAds: (await api.getAdsByGame({ gameId })) ?? ([] as Ad[]),
      });
    } catch (error) {
      console.log(error);
      set({ errorOnFetchAds: true });
    } finally {
      set({ loadingCurrentAds: false });
    }
  },
  postAd: async (body: AddAdToGameRequest) => {
    set({ isSendingAd: true, errorOnSendAd: false });
    try {
      await api.addAdToGame(body);
    } catch (error) {
      console.log(error);
      set({ errorOnSendAd: true });
    } finally {
      set({ isSendingAd: false });
    }
  },
}));
