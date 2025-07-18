"use client";

import { useState } from "react";
import CalculatorDisplay from "./components/CalculatorDiplay";
import CalculatorButtons from "./components/CalculatorButton";
import CalculatorResult from "./components/CalculatorResult";

export default function Home() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setResult(null);
    setError(null);

    if (!expression.trim()) {
      setError("Please enter a math expression.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: expression }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong.");
      } else {
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data.result.toString());
        }
      }
    } catch {
      setError("Failed to connect to backend.");
    }
  };

  const handleButtonClick = (value: string) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression("");
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Calculator</h1>

        <CalculatorDisplay
          expression={expression}
          onChange={(e) => setExpression(e.target.value)}
        />

        <CalculatorButtons
          onButtonClick={handleButtonClick}
          onCalculate={handleCalculate}
          onClear={handleClear}
        />

        <CalculatorResult result={result} error={error} />
      </div>
    </main>
  );
}
