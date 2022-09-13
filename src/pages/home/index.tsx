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

function Home() {
  const [isModalToggled, setIsModalToggled] = useAtom(IsModalToggled);

  const toggle = useCallback(() => {
    setIsModalToggled(!isModalToggled);
  }, [isModalToggled]);

  return (
    <div className="w-full min-h-screen flex flex-col py-4">
      <Header />
      <GameGrid />
      <PublishAd />
      <Modal isOpen={isModalToggled} onClose={toggle} toggle={toggle}>
        <div className="flex flex-col items-center justify-center my-auto">
          <MagnifyingGlassPlus size={64} className="text-gray-300" />
          <h1 className="text-2xl font-bold text-gray-200">No games found</h1>
          <p className="text-center text-gray-100">
            We couldn't find any games matching your search. Try searching for
            something else.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
