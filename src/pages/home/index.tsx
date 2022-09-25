import { useEffect } from "react";
import { useState } from "react";
import { Header } from "./header";
import { MagnifyingGlassPlus, Spinner } from "phosphor-react";
import { GameGrid } from "components/GameGrids";
import { PublishAd } from "components/PublishAd";
import { Modal } from "components/Modal";
import { useCallback } from "react";
import { usePublishAdModal } from "atoms/usePublishAdModal";
import { useAtom } from "jotai";
import { useGameStore } from "stores/gameStore";
import { Form as ModalForm } from "components/Form";
import { Toast } from "components/Toast";
import { useToast } from "components/Toast/useToast";
import { useGameAdsModal } from "atoms/useGameAdsModal";
import Lottie from "lottie-react";
import _404 from "assets/animations/404.json";
import Loading from "assets/animations/loading.json";
import { ButtonPublishAd, CancelButton } from "../../components/Buttons";

function Home() {
  const publishAdModal = usePublishAdModal();
  const gameAdsModal = useGameAdsModal();

  const {
    games,
    fetchGames,
    loadingGames,
    loadingCurrentAds,
    errorOnFetchGames,
    errorOnFetchAds,
    errorOnSendAd,
    currentAds,
  } = useGameStore();

  const toast = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (errorOnSendAd || errorOnFetchGames) {
      toast.open();
    }
  }, [errorOnFetchGames, errorOnSendAd]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <GameGrid games={games} />
      <PublishAd />
      <Modal
        type="add_ad"
        isOpen={publishAdModal.isOpen}
        onClose={() => {}}
        toggle={publishAdModal.toggle}
      >
        <ModalForm />
      </Modal>
      <Modal
        type="ad_info"
        isOpen={gameAdsModal.isOpen}
        onClose={() => {}}
        toggle={gameAdsModal.toggle}
      >
        {loadingCurrentAds ? (
          <Lottie
            animationData={Loading}
            loop
            autoPlay
            className={"w-full h-full max-w-xs max-h-80 m-auto"}
          />
        ) : errorOnFetchAds || currentAds.length === 0 ? (
          <div
            className={
              "w-full h-full flex-col gap-3 justify-center items-center"
            }
          >
            <Lottie
              animationData={_404}
              loop
              autoPlay
              className={"w-full h-full max-w-xs max-h-80"}
            />
            <p className="text-white font-bold">
              Sem anúncios para este jogo...
            </p>
            <p className="text-white font-bold mb-3">Deseja criar um?</p>
            <ButtonPublishAd className="w-full" />
            <CancelButton className="w-full mt-3" />
          </div>
        ) : (
          <span className={"text-white font-bold"}>
            {JSON.stringify(currentAds)}
          </span>
        )}
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
