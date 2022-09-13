import { useEffect } from "react";
import { useState } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { motion } from "framer-motion";
import Game1 from "/game-1.png";
import Game2 from "/game-2.png";
import Game3 from "/game-3.png";
import Game4 from "/game-4.png";
import Game5 from "/game-5.png";
import Game6 from "/game-6.png";
import Card from "components/gameGrids/card";

const TemplateCard = {
  image: "",
  name: "Game Name",
  adsCount: 0,
  onClick: () => {},
};

export function GameGrid() {
  const [games, setGames] = useState<typeof TemplateCard[]>([]);
  useEffect(() => {
    setGames([
      {
        ...TemplateCard,
        image: Game1,
        name: "Game 1",
        adsCount: 0,
      },
      {
        ...TemplateCard,
        image: Game2,
        name: "Game 2",
        adsCount: 1,
      },
      {
        ...TemplateCard,
        image: Game3,
        name: "Game 3",
        adsCount: 2,
      },
      {
        ...TemplateCard,
        image: Game4,
        name: "Game 4",
        adsCount: 3,
      },
      {
        ...TemplateCard,
        image: Game5,
        name: "Game 5",
        adsCount: 4,
      },
      {
        ...TemplateCard,
        image: Game6,
        name: "Game 6",
        adsCount: 5,
      },
    ]);
  }, []);
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
        <Card key={index} {...game} />
      ))}
      <CaretRight
        className={`w-20 h-20 absolute text-white top-1/2 transform -translate-y-1/2 right-[-80px] cursor-pointer z-50`}
      />
    </motion.div>
  );
}
