type Props = {
  result: string | null;
  error: string | null;
};

export default function CalculatorResult({ result, error }: Props) {
  return (
    <>
      {result !== null && (
        <div className="text-black font-semibold text-center">
          Result: {result}
        </div>
      )}
      {error && <div className="text-red text-center">Error: {error}</div>}
    </>
  );
}
