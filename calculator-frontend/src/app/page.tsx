"use client";

import { useState } from "react";

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
        setResult(data.result);
      }
    } catch (err) {
      setError("Failed to connect to backend.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Calculator</h1>

        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter expression (e.g. 3+4*2)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-4 text-green-600 font-semibold">
            Result: {result}
          </div>
        )}

        {error && <div className="mt-4 text-red-500">Error: {error}</div>}
      </div>
    </main>
  );
}
