type HistoryItem = {
  expr: string;
  result: string;
};

type Props = {
  history: HistoryItem[];
  onSelect: (expression: string) => void;
  onClear: () => void;
};

export default function CalculatorHistory({
  history,
  onSelect,
  onClear,
}: Props) {
  if (history.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-black text-lg font-semibold">History</h2>
        <button
          onClick={onClear}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-1 max-h-40 overflow-y-auto">
        {history.map((item, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(item.expr)}
            className="cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200 text-black text-sm font-mono"
          >
            {item.expr} = {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}
