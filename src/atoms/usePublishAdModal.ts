import React, { useCallback } from "react";
import { atom, useAtom } from "jotai";

const isPublishAdModalOpen = atom(false);

export const usePublishAdModal = () => {
  const [isOpen, setIsOpen] = useAtom(isPublishAdModalOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return { isOpen, open, close, toggle };
};
