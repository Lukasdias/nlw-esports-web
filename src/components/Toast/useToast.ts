import { atom, useAtom } from "jotai";

export const isToastOpen = atom(false);

export const useToast = () => {
  const [isOpen, setIsOpen] = useAtom(isToastOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};
