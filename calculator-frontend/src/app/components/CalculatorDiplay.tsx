type Props = {
  expression: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CalculatorDisplay({ expression, onChange }: Props) {
  return (
    <input
      type="text"
      value={expression}
      onChange={onChange}
      placeholder="Enter expression"
      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-right font-mono text-lg"
    />
  );
}
