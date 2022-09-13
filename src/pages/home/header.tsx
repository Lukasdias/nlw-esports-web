import Logo from "assets/logo-nlw-esports.svg";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  return (
    <header className="w-full block pt-10 lg:pt-20">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        src={Logo}
        alt="Logo da NLW"
        className="m-auto w-4/5 max-w-[285px]"
      />
      <motion.h1
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
        }}
        className="text-4xl lg:text-6xl text-center font-black text-white mt-10 lg:mt-20 tracking-tight"
      >
        Seu{" "}
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="bg-clip-text bg-nlw-gradient text-transparent"
        >
          duo
        </motion.span>{" "}
        está aqui
      </motion.h1>
    </header>
  );
};
