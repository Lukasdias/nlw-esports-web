interface Props {
  day: string;
  value: string;
  selected: boolean | undefined;
  selectDay: (value: string) => void;
}

export const WeekDayButton = ({ day, value, selected, selectDay }: Props) => {
  return (
    <button
      type="button"
      aria-label="botão dia da semana"
      className={`flex items-center justify-center mx-1 flex-1 ${
        selected ? "bg-violet-500" : "bg-zinc-900"
      } flex-grow rounded-sm cursor-pointer transition duration-200`}
      onClick={() => selectDay(value)}
    >
      <div className="text-white font-bold">{day}</div>
    </button>
  );
};
