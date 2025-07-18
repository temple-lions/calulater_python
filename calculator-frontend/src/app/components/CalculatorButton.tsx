type Props = {
  onButtonClick: (value: string) => void;
  onCalculate: () => void;
  onClear: () => void;
};

export default function CalculatorButtons({
  onButtonClick,
  onCalculate,
  onClear,
}: Props) {
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {buttons.map((btn) =>
        btn === "=" ? (
          <button
            key={btn}
            onClick={onCalculate}
            className="col-span-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 font-bold"
          >
            {btn}
          </button>
        ) : (
          <button
            key={btn}
            onClick={() => onButtonClick(btn)}
            className="col-span-1 bg-gray-200 py-2 rounded-md hover:bg-gray-300 font-bold"
          >
            {btn}
          </button>
        )
      )}
      <button
        onClick={onClear}
        className="col-span-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 font-bold"
      >
        Clear
      </button>
    </div>
  );
}
