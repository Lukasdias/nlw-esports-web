import { CaretLeft, CaretRight } from "phosphor-react";
import { motion } from "framer-motion";
import Card from "components/GameGrids/Card";
import { Game } from "api/types";
import { useGameAdsModal } from "atoms/useGameAdsModal";
import { useGameStore } from "stores/gameStore";

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

  return (
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
      <CaretLeft
        className={`w-20 h-20 absolute text-zinc-400 top-1/2 transform -translate-y-1/2 left-[-80px] cursor-not-allowed z-50`}
      />
      {games.map((game, index) => (
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
      <CaretRight
        className={`w-20 h-20 absolute text-white top-1/2 transform -translate-y-1/2 right-[-80px] cursor-pointer z-50`}
      />
    </motion.div>
  );
}
