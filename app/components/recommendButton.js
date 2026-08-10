"use client"

import {useState} from 'react';

export default function RecommendButton({itemId}) {
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    const data = await response.json();

    if (data?.error) {
      setError(data.error);
    } else {
      setRecommendation(data);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading} className="inline-flex items-center justify-center rounded-full bg-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:bg-emerald-300">
        Get Recommendations
      </button>

      {loading && <p className="mt-3 text-sm text-white">Loading...</p>}
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      {recommendation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-3xl rounded-[2rem] border-2 border-green-500 bg-neutral-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-neutral-100">{recommendation.title}</h3>
                <p className="mt-2 text-neutral-300">{recommendation.description}</p>
              </div>
              <button
                onClick={() => setRecommendation(null)}
                className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 px-4 text-sm font-semibold text-white transition hover:bg-green-600">
                Done
              </button>
            </div>

            <p className="mt-4 italic text-neutral-400">{recommendation.reason}</p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-neutral-300">
              <span className="rounded-full bg-neutral-700 px-3 py-1 shadow-sm">Category: <b>{recommendation.category}</b></span>
            </div>

            {recommendation.parts?.length > 0 && (
              <div className="mt-6 space-y-4">
                {recommendation.parts.map((part, index) => (
                  <div key={index} className="rounded-2xl border border-neutral-700 bg-neutral-950 p-4 shadow-sm">
                    <p className="font-semibold text-neutral-100">{part.name}</p>
                    {part.brand && <p className="text-sm text-neutral-400">Brand: {part.brand}</p>}
                    {part.category && <p className="text-sm text-neutral-400">Category: {part.category}</p>}
                    {part.details && <p className="mt-2 text-neutral-300">{part.details}</p>}
                    {typeof part.score == 'number' && (
                      <p className="mt-2 text-sm text-neutral-500">Score: {part.score}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}