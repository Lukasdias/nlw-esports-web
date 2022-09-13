import { MagnifyingGlassPlus } from "phosphor-react";
import { motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

export const IsModalToggled = atom(false);

export const PublishAd = () => {
  const [isModalToggled, setIsModalToggled] = useAtom(IsModalToggled);

  const toggle = useCallback(() => {
    setIsModalToggled(!isModalToggled);
  }, [isModalToggled]);

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
        delay: 0.6,
      }}
      className="w-4/5 flex flex-col lg:flex-row items-center rounded-xl py-5 px-5 lg:py-8 lg:px-8 mt-12 mx-auto relative bg-[#2A2634] justify-between gap-2"
    >
      <div className="w-full h-2 absolute left-0 top-[-1px] bg-nlw-gradient rounded-t-xl" />
      <div className="gap-1 w-auto">
        <h3 className="text-2xl font-black text-white">
          Não encontrou seu duo?
        </h3>
        <p className="text-white">
          Publique um anúncio para encontrar novos players!
        </p>
      </div>
      <button
        aria-label="Botão publicar anúncio"
        type="button"
        className="h-12 gap-2 flex justify-center items-center p-4 rounded-xl bg-violet-500 text-white font-bold group hover:bg-transparent transition duration-200 hover:text-violet-500 hover:border-violet-500 border-2 border-transparent"
        onClick={toggle}
      >
        <MagnifyingGlassPlus
          className="w-6 h-6 group-hover:text-violet-500 transition duration-200"
          weight="bold"
        />{" "}
        <span className="group-hover:text-violet-500 transition duration-200">
          Publicar anúncio
        </span>
      </button>
    </motion.div>
  );
};
