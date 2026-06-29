"use client";

import { useRouter } from "next/navigation";

export default function WheelCard({ rim }) {
  const router = useRouter();

  return (
    <div className="card transition-transform hover:-translate-y-1 duration-300">
      <div className="p-4">
        <div className="text-2xl">{rim.brand}</div>
        <div className="muted font-bold">{rim.name}</div>
      </div>

      <div className="h-60 overflow-hidden rounded-t-xl bg-transparent">
        <img
          src={rim.imageUrl}
          alt={rim.name}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      <div className="p-4">
        <p className="p-2">
          <a className="font-bold">${rim.price}</a> <a className="muted"> /ea</a>
        </p>
        <button
          onClick={() => router.push(`/wheels/${rim.id}`)}
          className="btn-accent w-full transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}