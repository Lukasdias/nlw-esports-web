import { useForm, SubmitHandler } from "react-hook-form";
import { AddAdToGameRequest, Game } from "../../api/types";
import { Combobox, Transition } from "@headlessui/react";
import { useGameStore } from "stores/gameStore";
import { Fragment, useState } from "react";
import { CheckSquare, ArrowsVertical, GameController } from "phosphor-react";
import { motion } from "framer-motion";
import { IsModalToggled } from "../publishAd";
import { useAtom } from "jotai";

const SearchGamesAnimationVariants = {
  hidden: {
    opacity: [1, 0],
    scale: [1, 0],
  },
  visible: {
    opacity: [0, 1],
    scale: [0, 1],
  },
};

export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddAdToGameRequest>();

  const onSubmit: SubmitHandler<AddAdToGameRequest> = (data) =>
    console.log(data);
  const { games } = useGameStore();

  const [isModalToggled, setIsModalToggled] = useAtom(IsModalToggled);
  const [selected, setSelected] = useState(games);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState("");

  const filteredGames =
    query === ""
      ? games
      : games.filter((game) =>
          game.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="block font-semibold text-white">Qual o game?</label>
      <Combobox onChange={setSelected} as="div" className="relative w-full">
        <div className="relative mt-1">
          <div className="relative w-full">
            <Combobox.Input
              className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
              {...register("gameId", { required: true })}
              displayValue={(game: Game) => game?.name}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder={"Selecione o game que deseja jogar"}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ArrowsVertical
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
        </div>
        <motion.div
          variants={SearchGamesAnimationVariants}
          animate={query === "" && !isSearchFocused ? "hidden" : "visible"}
          initial="hidden"
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredGames.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nenhum jogo encontrado.
              </div>
            ) : (
              filteredGames.map((game) => (
                <Combobox.Option
                  key={game.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-purple-600 text-white" : "text-zinc-600"
                    }`
                  }
                  value={game}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {game.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-purple-600"
                          }`}
                        >
                          <CheckSquare className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </motion.div>
      </Combobox>

      <label className="block font-semibold text-white">
        Seu nome (ou nickname)
      </label>
      <input
        type="text"
        placeholder={"Como te chamam dentro do game?"}
        {...(register("name"), { required: true })}
        className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
      />

      <div className="flex flex-col lg:flex-row w-full gap-3">
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 flex-col font-semibold text-white">
            Joga há quantos anos?
          </label>
          <input
            placeholder={"Tudo bem ser ZERO"}
            type="number"
            {...(register("yearsPlaying"), { required: true, min: 0 })}
            className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 flex-col font-semibold text-white">
            Discord
          </label>
          <input
            type="text"
            placeholder={"Usuario#0000"}
            {...(register("discord"), { required: true })}
            className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-3">
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 flex-col font-semibold text-white items-center">
            Quando costuma jogar?
          </label>
          <input
            type="text"
            {...(register("yearsPlaying"), { required: true })}
            className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 font-semibold text-white ">
            Qual horário do dia?
          </label>
          <div className={"gap-1 flex"}>
            <input
              type="string"
              placeholder="De"
              {...(register("discord"), { required: true })}
              className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600 focus:outline-none"
            />
            <input
              type="string"
              placeholder="Até"
              {...(register("discord"), { required: true })}
              className="w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-2">
        <input
          className="w-4 h-4 text-purple-500 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 focus:text-purple-800"
          type="checkbox"
          {...(register("useVoiceChannel"), { required: true })}
        />
        <label className="text-white text-sm">
          Costumo me conectar ao chat de voz
        </label>
      </div>

      <div className="w-full flex justify-end gap-2">
        <button
          aria-label={"Botão publicar anuncio"}
          type={"button"}
          onClick={() => {
            setIsModalToggled(false);
          }}
          className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline transition-all duration-200"
        >
          Cancelar
        </button>
        <button
          aria-label={"Botão publicar anuncio"}
          type={"submit"}
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline transition-all duration-200 gap-2 flex flex-row"
        >
          <GameController className="w-6 h-6 text-white" />
          Encontrar duo
        </button>
      </div>
    </form>
  );
}
