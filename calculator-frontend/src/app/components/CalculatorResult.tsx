type Props = {
  result: string | null;
  error: string | null;
};

export default function CalculatorResult({ result, error }: Props) {
  return (
    <>
      {result !== null && (
        <div className="text-green-600 font-semibold text-center">
          Result: {result}
        </div>
      )}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
    </>
  );
}
