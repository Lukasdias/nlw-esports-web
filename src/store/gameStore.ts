import { GameSchema } from "./../types/index";
import create from "zustand";

export type GameStore = {
  games: GameSchema[];
  fetchGames: () => Promise<GameSchema[]>;
};

export const useGameStore = create((set, get) => ({
  games: [],
  fetchGames: async () => {
    return [] as GameSchema[];
  },
}));
