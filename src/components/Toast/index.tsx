import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useToast } from "./useToast";
import { useGameStore } from "../../stores/gameStore";

interface ToastProps {
  children: React.ReactNode;
}

export function Toast({ children }: ToastProps) {
  const toast = useToast();
  const { errorOnFetchGames, errorOnSendAd } = useGameStore();

  useEffect(() => {
    if (toast.isOpen) {
      setTimeout(() => {
        toast.close();
      }, 1000);
    }
  }, [toast.isOpen]);

  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      {toast.isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`fixed z-50 bottom-0 right-0 m-4 bg-white rounded-md shadow-md p-4 border-t-4 ${
            errorOnFetchGames || errorOnSendAd
              ? "border-red-500"
              : "border-purple-500"
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
