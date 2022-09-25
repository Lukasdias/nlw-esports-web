import { useEffect } from "react";
import { useState } from "react";
import { Header } from "./header";
import { MagnifyingGlassPlus } from "phosphor-react";
import { GameGrid } from "components/gameGrids";
import { PublishAd } from "components/publishAd";
import { Modal } from "components/modal";
import { useCallback } from "react";
import { IsModalToggled } from "components/publishAd";
import { useAtom } from "jotai";
import { useGameStore } from "stores/gameStore";
import { Form as ModalForm } from "components/form";

function Home() {
  const [isModalToggled, setIsModalToggled] = useAtom(IsModalToggled);
  const { games, fetchGames, loadingGames } = useGameStore();

  useEffect(() => {
    fetchGames();
  }, []);

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
    </div>
  );
}

export default Home;
