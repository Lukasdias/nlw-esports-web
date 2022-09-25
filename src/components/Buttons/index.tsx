import { MagnifyingGlassPlus } from "phosphor-react";
import { useGameAdsModal } from "atoms/useGameAdsModal";
import { usePublishAdModal } from "atoms/usePublishAdModal";

function Button({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Button</button>;
}

interface ButtonProps {
  className?: string;
}

export function ButtonPublishAd({ className }: ButtonProps) {
  const publishAdModal = usePublishAdModal();
  const gameAdsModal = useGameAdsModal();

  return (
    <button
      aria-label="Botão publicar anúncio"
      type="button"
      className={`h-12 gap-2 flex justify-center items-center p-4 rounded-xl bg-violet-500 text-white font-bold group hover:bg-transparent transition duration-200 hover:text-violet-500 hover:border-violet-500 border-2 border-transparent ${className}`}
      onClick={() => {
        publishAdModal.open();
        gameAdsModal.close();
      }}
    >
      <MagnifyingGlassPlus
        className="w-6 h-6 group-hover:text-violet-500 transition duration-200"
        weight="bold"
      />{" "}
      <span className="group-hover:text-violet-500 transition duration-200">
        Publicar anúncio
      </span>
    </button>
  );
}

export function CancelButton({ className }: ButtonProps) {
  const publishAdModal = usePublishAdModal();
  const gameAdsModal = useGameAdsModal();

  return (
    <button
      aria-label={"Botão publicar anuncio"}
      type={"button"}
      onClick={() => {
        gameAdsModal.close();
        publishAdModal.close();
      }}
      className={`bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-3 px-5 rounded-xl focus:outline-none focus:shadow-outline transition-all duration-200 ${className}`}
    >
      Cancelar
    </button>
  );
}

export default Button;
