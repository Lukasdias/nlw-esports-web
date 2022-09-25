import { CaretLeft, CaretRight } from "phosphor-react";
import { motion } from "framer-motion";
import Card from "components/GameGrids/Card";
import { Game } from "api/types";
import { useGameAdsModal } from "atoms/useGameAdsModal";
import { useGameStore } from "stores/gameStore";
import Lottie from "lottie-react";
import _404 from "assets/animations/404.json";

const TemplateCard = {
  image: "",
  name: "Game Name",
  adsCount: 0,
  onClick: () => {},
};

type GameGridProps = {
  games: Game[];
};

export function GameGrid({ games }: GameGridProps) {
  const gameAdsModal = useGameAdsModal();
  const gameStore = useGameStore();

  function handleCardClick(game: Game) {
    gameAdsModal.toggle();
    gameStore.fetchAdsByGame(game.id);
  }

  console.log(!gameStore.errorOnFetchGames);

  return (
    <>
      {!gameStore.errorOnFetchGames ? (
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="w-full px-3 sm:px-0 lg:w-4/5 mx-auto grid grid-cols-2 lg:grid-cols-6 gap-3 mt-8 relative"
        >
          {games?.map((game, index) => (
            <Card
              key={index}
              image={game.bannerUrl}
              name={game.name}
              adsCount={game._count.ads}
              onClick={() => {
                handleCardClick(game);
              }}
            />
          ))}
        </motion.div>
      ) : (
        <>
          <Lottie
            animationData={_404}
            loop
            autoPlay
            className={"w-full max-w-xs max-h-50 mx-auto"}
          />
          <span className="text-white font-bold text-lg mx-auto animate-pulse">
            Houston we have a problem
          </span>
          <span className="text-white font-bold text-lg mx-auto animate-pulse">
            Backend is not responding
          </span>
        </>
      )}
    </>
  );
}
