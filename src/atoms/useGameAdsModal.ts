import React, { useCallback } from "react";
import { atom, useAtom } from "jotai";

const isGameAdsModalOpen = atom(false);

export const useGameAdsModal = () => {
  const [isOpen, setIsOpen] = useAtom(isGameAdsModalOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return { isOpen, open, close, toggle };
};
