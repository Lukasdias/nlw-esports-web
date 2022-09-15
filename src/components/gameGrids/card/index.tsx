import { memo } from "react";
import { motion } from "framer-motion";
import { GameSchema } from "../../../types";

interface GameCardProps extends GameSchema {
  onClick: () => void;
}

const Card: React.FC<GameCardProps> = (props) => {
  const { image, name, onClick, adsCount } = props;
  return (
    <motion.a 
      href="#"
      className="flex flex-col justify-end gap-1 relative w-full max-w-[240px] h-[240px]  max-h-[240px] rounded-xl shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl group overflow-hidden mx-auto"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="absolute w-full h-full rounded-xl group-hover:scale-125 transition duration-300"
      />
      <h2 className="text-white text-base font-bold relative z-10 pl-2 ">
        {name}
      </h2>
      <p className="text-white text-sm relative z-10 pl-2 mb-2">
        {adsCount === 0 ? "Nenhum anúncio" : `${adsCount} ads`}
      </p>
    </motion.a>
  );
};

export default memo(Card);
