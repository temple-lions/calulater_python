export default function CalculatorButtons({
  onButtonClick,
  onCalculate,
  onClear,
}: {
  onButtonClick: (value: string) => void;
  onCalculate: () => void;
  onClear: () => void;
}) {
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
    <div className="grid grid-cols-4 gap-3 mt-4">
      {buttons.map((btn) => {
        const isEquals = btn === "=";

        return (
          <button
            key={btn}
            onClick={() => (isEquals ? onCalculate() : onButtonClick(btn))}
            className={`rounded py-4 text-lg font-medium ${
              isEquals
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {btn}
          </button>
        );
      })}

      <button
        onClick={onClear}
        className="bg-red-500 text-white rounded py-4 text-lg font-medium hover:bg-red-600 col-span-2 col-start-2"
      >
        C
      </button>
    </div>
  );
}
