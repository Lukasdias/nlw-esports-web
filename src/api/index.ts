import axios from "axios";
import {
  Ad,
  AddAdToGameRequest,
  Game,
  GetAdsByGameRequest,
  GetDiscordRequest,
} from "./types";

const IP = "http://192.168.1.39";

export async function getGames() {
  return (await axios.get(`${IP}:3333/games`)).data.map((game: any) => {
    return {
      ...game,
      ads: game?._count?.ads,
    } as Game;
  });
}

export async function getDiscord(params: GetDiscordRequest) {
  return (await axios.get(`${IP}:3333/ads/${params.adId}/discord`))
    .data as string;
}

export async function getAdsByGame(params: GetAdsByGameRequest) {
  return (await axios.get(`${IP}:3333/games/${params.gameId}/ads`))
    .data as Ad[];
}

export async function addAdToGame(params: AddAdToGameRequest) {
  return (await axios.post(`${IP}:3333/games/${params.gameId}/ads`, params))
    .data as Ad;
}
