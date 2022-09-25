import { useEffect } from "react";
import { useState } from "react";
import { Header } from "./header";
import { MagnifyingGlassPlus } from "phosphor-react";
import { GameGrid } from "components/GameGrids";
import { PublishAd } from "components/PublishAd";
import { Modal } from "components/Modal";
import { useCallback } from "react";
import { IsModalToggled } from "components/PublishAd";
import { useAtom } from "jotai";
import { useGameStore } from "stores/gameStore";
import { Form as ModalForm } from "components/Form";
import { Toast } from "components/Toast";
import { useToast } from "../../components/Toast/useToast";

function Home() {
  const [isModalToggled, setIsModalToggled] = useAtom(IsModalToggled);
  const { games, fetchGames, loadingGames, errorOnFetchGames, errorOnSendAd } =
    useGameStore();

  const toast = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (errorOnSendAd || errorOnFetchGames) {
      toast.open();
    }
  }, [errorOnFetchGames, errorOnSendAd]);

  const toggle = useCallback(() => {
    setIsModalToggled(!isModalToggled);
  }, [isModalToggled]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <GameGrid games={games} />
      <PublishAd />
      <Modal isOpen={isModalToggled} onClose={() => {}} toggle={toggle}>
        <ModalForm />
      </Modal>
      <Toast>
        <span className="font-bold text-1xl text-purple-700">
          {errorOnFetchGames
            ? "Error ao buscar jogos"
            : errorOnSendAd
            ? "Error ao enviar anúncio"
            : "Anúncio enviado com sucesso"}
        </span>
      </Toast>
    </div>
  );
}

export default Home;
