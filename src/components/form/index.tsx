import { useForm, SubmitHandler } from "react-hook-form";
import { AddAdToGameRequest, Game } from "../../api/types";
import { Combobox, Transition } from "@headlessui/react";
import { useGameStore } from "stores/gameStore";
import { Fragment, useState } from "react";
import { CheckSquare, ArrowsVertical, GameController } from "phosphor-react";
import { motion } from "framer-motion";
import { IsModalToggled } from "../publishAd";
import { useAtom } from "jotai";
import { WeekDayButton } from "./WeekDayButton";

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

const WeekDays = [
  { name: "S", value: "1" },
  { name: "T", value: "2" },
  { name: "Q", value: "3" },
  { name: "Q", value: "4" },
  { name: "S", value: "5" },
];

export function Form() {
  const { games } = useGameStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddAdToGameRequest>();

  const onSubmit: SubmitHandler<AddAdToGameRequest> = (data) =>
    console.log({
      ...data,
      weekDays: daysSelected,
    });
  const [isModalToggled, setIsModalToggled] = useAtom(IsModalToggled);
  const [selected, setSelected] = useState(games);
  const [daysSelected, setDaysSelected] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState("");
  const HHMM12HourFormatOptionalLeading0Regex =
    /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  const filteredGames =
    query === ""
      ? games
      : games.filter((game) =>
          game.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleDayClick = (value: string) => {
    if (daysSelected.includes(value)) {
      setDaysSelected(daysSelected.filter((day) => day !== value));
    } else {
      setDaysSelected([...daysSelected, value]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="block font-semibold text-white">Qual o game?</label>
      <Combobox onChange={setSelected} as="div" className="relative w-full">
        <div className="relative mt-1">
          <div className="relative w-full">
            <Combobox.Input
              as={"input"}
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
                        className={`truncate flex items-center gap-2 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <img
                          src={game.bannerUrl}
                          alt={`${game.name} avatar`}
                          className="w-5 h-5 rounded"
                        />
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
        {...register("name", { required: true, min: 4, max: 25 })}
        placeholder={"Como te chamam dentro do game?"}
        className="autofill:bg-zinc-900 w-full bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
      />

      <div className="flex flex-col lg:flex-row w-full gap-3">
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 flex-col font-semibold text-white">
            Joga há quantos anos?
          </label>
          <input
            {...register("yearsPlaying", {
              required: true,
              min: 0,
              max: 99,
            })}
            placeholder={"Tudo bem ser ZERO"}
            type="number"
            className="w-full autofill:bg-zinc-900 bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 flex-col font-semibold text-white">
            Discord
          </label>
          <input
            type="text"
            {...register("discord", { required: true, min: 4, max: 25 })}
            placeholder={"Usuario#0000"}
            className="w-full autofill:bg-zinc-900 bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-3">
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-col font-semibold text-white items-center">
            Quando costuma jogar?
          </label>
          <div
            {...register("weekDays", {
              required: true,
            })}
            className="flex flex-row flex-1 w-full"
          >
            {WeekDays?.map((day, idx: number) => (
              <WeekDayButton
                key={idx}
                day={day.name}
                value={day.value}
                selected={daysSelected.includes(day.value) ? true : false}
                selectDay={handleDayClick}
              />
            ))}
          </div>
          {errors.weekDays && (
            <p className={"text-red-500 font-bold text-sm"}>
              Selecione pelo menos um dia da semana
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="flex flex-1 font-semibold text-white ">
            Qual horário do dia?
          </label>
          <div className={"gap-1 flex"}>
            <input
              type="string"
              placeholder="De"
              {...register("hourStart", {
                required: true,
                pattern: HHMM12HourFormatOptionalLeading0Regex,
              })}
              className="w-full autofill:bg-zinc-900 bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600 focus:outline-none"
            />
            <input
              type="string"
              placeholder="Até"
              {...register("hourEnd", {
                required: true,
                pattern: HHMM12HourFormatOptionalLeading0Regex,
              })}
              className="w-full autofill:bg-zinc-900 bg-zinc-900 rounded placeholder:text-zinc-500 h-12 placeholder:text-sm  text-white px-4 py-3 transition-all duration-200 border-0 focus:outline-0 focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-purple-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-2">
        <input
          {...register("useVoiceChannel", {
            required: true,
          })}
          className="w-4 h-4 autofill:bg-zinc-900 text-purple-500 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 focus:text-purple-800"
          type="checkbox"
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
