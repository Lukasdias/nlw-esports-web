import { Dialog } from "@headlessui/react";
import { motion, Variants } from "framer-motion";
import { X } from "phosphor-react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
};

const ModalVariants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    opacity: 0,
    scale: 0.9,
  },
};

const ModalCoverVariants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    opacity: [1, 0],
    scale: [1, 0.55],
  },
};

export function Modal({ children, isOpen, toggle, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={toggle}>
      <motion.div
        variants={ModalCoverVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed inset-0 bg-black bg-opacity-75"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <motion.div
            variants={ModalVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <Dialog.Panel className="w-[488px]  max-w-lg transform flex flex-col overflow-hidden rounded-2xl bg-background-secondary text-left align-middle shadow-xl transition-all px-10 py-8">
              <Dialog.Title
                as="h1"
                className="text-3xl font-[900] leading-6 text-white w-full flex mb-10 justify-between items-center relative"
              >
                Publique um anúncio
              </Dialog.Title>
              {children}
            </Dialog.Panel>
          </motion.div>
        </div>
      </div>
    </Dialog>
  );
}
