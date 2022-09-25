import { Dialog } from "@headlessui/react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { X } from "phosphor-react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
  animate?: boolean;
};

const ModalVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: 100,
  },
  exit: {
    opacity: 0,
    y: 100,
  },
};

const ModalCoverVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

export function Modal({ children, isOpen, toggle, onClose }: ModalProps) {
  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          className="relative z-10"
          key="modal"
          onClose={() => {
            toggle();
          }}
        >
          <motion.div
            variants={ModalCoverVariants}
            initial="closed"
            animate={"open"}
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-75"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                variants={ModalVariants}
                initial="closed"
                exit="exit"
                animate={"open"}
              >
                <Dialog.Panel className="w-[95%] mx-auto max-w-[488px]  transform flex flex-col overflow-hidden rounded-2xl bg-background-secondary text-left align-middle shadow-xl transition-all px-10 py-8">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl  sm:text-3xl font-[900] leading-6 sm:leading-10 text-white w-full flex mb-10 justify-between items-center relative "
                  >
                    Publique um anúncio
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
